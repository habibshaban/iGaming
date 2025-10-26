import { test, expect } from "@playwright/test";

test.describe("Game Filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/username/i).fill("player1");
    await page.locator('input[name="password"]').fill("player1");
    await page.getByRole("button", { name: /login/i }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("search")).toBeVisible();
  });

  test("should filter games by search query", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search");
    await searchInput.fill("diamond");
    await page.waitForTimeout(500);

    const gamesGrid = page.locator(".games-grid");
    await expect(gamesGrid).toBeVisible();
    const gameItems = page.locator(".game-item");
    await expect(gameItems.first()).toBeVisible();
  });

  test("should clear search input", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search");
    await searchInput.fill("diamond");
    await page.waitForTimeout(500);

    await searchInput.clear();
    await expect(searchInput).toHaveValue("");
  });
});
