import { test, expect } from "@playwright/test";

test.describe("Smoke – Startseite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("lädt mit Titel und H1", async ({ page }) => {
    await expect(page).toHaveTitle(/Team Besenrein/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("besenrein");
  });

  test("Navbar: Logo, Links, Telefon-CTA", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Team Besenrein", exact: true })
    ).toBeVisible();
    for (const label of ["Leistungen", "Arbeit", "Über uns", "Kontakt"]) {
      await expect(page.getByRole("link", { name: label, exact: true }).first()).toBeVisible();
    }
    await expect(
      page.getByRole("link", { name: /0176 62584987/ }).first()
    ).toHaveAttribute("href", "tel:+4917662584987");
  });

  test("alle Hauptsektionen vorhanden", async ({ page }) => {
    for (const id of ["leistungen", "galerie", "ueber-uns", "kontakt"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("Nav scrollt zu Leistungen", async ({ page }) => {
    await page.getByRole("link", { name: "Leistungen", exact: true }).first().click();
    await expect(page.locator("#leistungen")).toBeInViewport();
  });

  test("Services: + öffnet Detailliste", async ({ page }) => {
    await page.getByRole("button", { name: "Details anzeigen" }).first().click();
    await expect(page.getByText("Leistungen im Detail").first()).toBeVisible();
  });

  test("Hero-Slider: Pfeil klickbar", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Nächstes Bild" })).toBeVisible();
    await page.getByRole("button", { name: "Nächstes Bild" }).click();
  });

  test("Vorher/Nachher-Regler vorhanden", async ({ page }) => {
    await expect(page.getByLabel("Vorher/Nachher-Regler")).toBeVisible();
  });

  test("About zeigt Inhaber", async ({ page }) => {
    await expect(page.locator("#ueber-uns")).toContainText("Timur Gürses");
  });

  test("Formular: Pflichtfeld-Validierung", async ({ page }) => {
    await page.locator("#kontakt").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Kostenloses Angebot anfordern/ }).click();
    await expect(page.getByText("Bitte geben Sie Ihren Namen an.")).toBeVisible();
  });

  test("Footer: Kontakt- und Rechts-Links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: /kontakt@team-besenrein\.de/ })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Impressum" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Datenschutz" })).toBeVisible();
  });
});

test.describe("Smoke – Rechtsseiten", () => {
  test("Impressum lädt (200)", async ({ page }) => {
    const res = await page.goto("/impressum");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Impressum" })).toBeVisible();
  });

  test("Datenschutz lädt (200)", async ({ page }) => {
    const res = await page.goto("/datenschutz");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Datenschutzerklärung" })).toBeVisible();
  });
});

test.describe("Smoke – Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("Burger-Menü öffnet Navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await expect(page.getByRole("link", { name: "Leistungen", exact: true })).toBeVisible();
  });
});