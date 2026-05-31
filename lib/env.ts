export const publicEnvKeys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_CTA_URL",
] as const;

export type PublicEnvKey = (typeof publicEnvKeys)[number];

export type PublicEnv = Readonly<{
  siteUrl: string;
  ctaUrl: string;
}>;

type PublicEnvSource = Record<string, string | undefined>;

export function readPublicEnv(
  source: PublicEnvSource = process.env,
): PublicEnv {
  return {
    siteUrl: readRequiredUrl(source, "NEXT_PUBLIC_SITE_URL"),
    ctaUrl: readRequiredUrl(source, "NEXT_PUBLIC_CTA_URL"),
  };
}

function readRequiredUrl(source: PublicEnvSource, key: PublicEnvKey): string {
  const value = source[key]?.trim();

  if (!value) {
    throw new Error(`${key} is required. Copy .env.example and set ${key}.`);
  }

  try {
    const url = new URL(value);
    return trimTrailingSlash(url.toString());
  } catch {
    throw new Error(`${key} must be an absolute URL.`);
  }
}

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}
