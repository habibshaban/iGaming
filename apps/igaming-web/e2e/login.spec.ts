import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.getByLabel(/username/i).fill("player1");
    await page.locator('input[name="password"]').fill("player1");
    await page.getByRole("button", { name: /login/i }).click();

    await page.waitForURL("/", { timeout: 10000 });
    await expect(page.getByRole("search")).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.getByLabel(/username/i).fill("invalid");
    await page.locator('input[name="password"]').fill("invalid");
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page.locator(".input-error").first()).toBeVisible();
  });
});
