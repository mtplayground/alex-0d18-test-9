import { expect, test } from "@playwright/test";

test("landing page shows the hero and primary CTA", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Agent Team for Founders",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /start building/i }).first(),
  ).toBeVisible();
});

test("landing page keeps semantic landmarks and heading hierarchy", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(3);
  await expect(page.getByRole("heading", { level: 3 })).toHaveCount(7);
});

test("keyboard focus exposes skip link and header CTA", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Agent Team for Founders home" }),
  ).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Start building" }).first(),
  ).toBeFocused();
});

for (const width of [320, 768, 1280, 1920]) {
  test(`landing page has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });
}
