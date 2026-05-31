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
