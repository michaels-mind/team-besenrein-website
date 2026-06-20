import { test, expect } from "@playwright/test";

// Sticky-Navbar für Sektions-Screenshots ausblenden,
// sonst überlagert sie den oberen Rand der Sektion.
const HIDE_HEADER = { content: "header { display: none !important; }" };

test.describe("Visual Regression", () => {
  // Navbar bekommt einen eigenen, sauberen Screenshot (eigene Bounding-Box)
  test("Navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toHaveScreenshot("navbar.png");
  });

  test("Hero", async ({ page }) => {
    await page.clock.install(); // Slider-Timer einfrieren → immer Slide 1
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const hero = page.locator("main > section").first();
    await expect(hero).toHaveScreenshot("hero.png");
  });

  test("Leistungen", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const s = page.locator("#leistungen");
    await s.scrollIntoViewIfNeeded();
    await expect(s).toHaveScreenshot("leistungen.png");
  });

  test("Galerie", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const s = page.locator("#galerie");
    await s.scrollIntoViewIfNeeded();
    await expect(s).toHaveScreenshot("galerie.png");
  });

  test("Ueber-uns", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const s = page.locator("#ueber-uns");
    await s.scrollIntoViewIfNeeded();
    await expect(s).toHaveScreenshot("ueber-uns.png");
  });

  test("Kontakt", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const s = page.locator("#kontakt");
    await s.scrollIntoViewIfNeeded();
    await expect(s).toHaveScreenshot("kontakt.png");
  });

  test("Footer", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag(HIDE_HEADER);
    const f = page.locator("footer");
    await f.scrollIntoViewIfNeeded();
    await expect(f).toHaveScreenshot("footer.png");
  });

  test("Impressum", async ({ page }) => {
    await page.goto("/impressum");
    await expect(page).toHaveScreenshot("impressum.png", { fullPage: true });
  });

  test("Datenschutz", async ({ page }) => {
    await page.goto("/datenschutz");
    await expect(page).toHaveScreenshot("datenschutz.png", { fullPage: true });
  });
});