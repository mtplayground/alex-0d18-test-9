import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const outDir = resolve("out");
const host = "0.0.0.0";
const port = Number.parseInt(process.env.STATIC_EXPORT_PORT ?? "8080", 10);
const origin = `http://localhost:${port}`;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? origin).replace(/\/$/, "");
const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "opengraph-image",
];

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function main() {
  assertOutDirectory();
  await assertRequiredFiles();

  const server = createServer(staticHandler);

  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(port, host, resolveListen);
  });

  try {
    await verifyHttpExport();
    console.log(`Static export verified at ${origin}`);
  } finally {
    await new Promise((resolveClose, rejectClose) => {
      server.close((error) => (error ? rejectClose(error) : resolveClose()));
    });
  }
}

function assertOutDirectory() {
  if (!existsSync(outDir)) {
    throw new Error("Expected out/ to exist. Run next build first.");
  }
}

async function assertRequiredFiles() {
  for (const file of requiredFiles) {
    const filePath = join(outDir, file);
    const fileStat = await stat(filePath).catch(() => undefined);

    if (!fileStat?.isFile()) {
      throw new Error(`Expected static export file out/${file}.`);
    }
  }
}

async function verifyHttpExport() {
  const home = await fetchText("/");
  assertIncludes(home, "Agent Team for Founders", "home page brand");
  assertIncludes(home, "Start building", "home page CTA");

  const notFound = await fetchText("/404.html");
  assertIncludes(notFound, "This page could not be found", "404 page");

  const robots = await fetchText("/robots.txt");
  assertIncludes(robots, "User-Agent: *", "robots user agent");
  assertIncludes(robots, "Allow: /", "robots allow rule");
  assertIncludes(robots, `Sitemap: ${siteUrl}/sitemap.xml`, "robots sitemap");

  const sitemap = await fetchText("/sitemap.xml");
  assertIncludes(sitemap, "<urlset", "sitemap urlset");
  assertIncludes(sitemap, `<loc>${siteUrl}</loc>`, "sitemap root URL");

  const ogImage = await fetchBinary("/opengraph-image");
  assertPng(ogImage);
  assertPngSize(ogImage, 1200, 630);
}

async function fetchText(pathname) {
  const response = await fetch(`${origin}${pathname}`);

  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}.`);
  }

  return response.text();
}

async function fetchBinary(pathname) {
  const response = await fetch(`${origin}${pathname}`);

  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}.`);
  }

  return Buffer.from(await response.arrayBuffer());
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(
      `Expected ${label} to include ${JSON.stringify(expected)}.`,
    );
  }
}

function assertPng(buffer) {
  const signature = "89504e470d0a1a0a";

  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Expected opengraph-image to be a PNG.");
  }
}

function assertPngSize(buffer, width, height) {
  const actualWidth = buffer.readUInt32BE(16);
  const actualHeight = buffer.readUInt32BE(20);

  if (actualWidth !== width || actualHeight !== height) {
    throw new Error(
      `Expected opengraph-image to be ${width}x${height}, got ${actualWidth}x${actualHeight}.`,
    );
  }
}

async function staticHandler(request, response) {
  const requestedPath = new URL(request.url ?? "/", origin).pathname;
  const filePath = resolveOutFile(requestedPath);

  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const fileStat = await stat(filePath).catch(() => undefined);

  if (!fileStat?.isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": await contentTypeFor(filePath) });
  createReadStream(filePath).pipe(response);
}

function resolveOutFile(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(
    /^(\.\.(\/|\\|$))+/,
    "",
  );
  const relativePath =
    normalizedPath === "/" || normalizedPath === "."
      ? "index.html"
      : normalizedPath.replace(/^\/+/, "");
  const filePath = resolve(outDir, relativePath);

  return filePath === outDir || filePath.startsWith(`${outDir}/`)
    ? filePath
    : undefined;
}

async function contentTypeFor(filePath) {
  const extension = extname(filePath);

  if (contentTypes.has(extension)) {
    return contentTypes.get(extension);
  }

  const header = await readFile(filePath, { encoding: null }).then((buffer) =>
    buffer.subarray(0, 8).toString("hex"),
  );

  return header === "89504e470d0a1a0a"
    ? "image/png"
    : "application/octet-stream";
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
