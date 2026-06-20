import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" },
  },
  projects: [
    // ── Smoke (funktional, einmal) ──
    { name: "smoke", testMatch: /smoke\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },

    // ── Visual: Desktop-Auflösungen ──
    {
      name: "visual-desktop-fhd",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: "visual-desktop-laptop",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "visual-desktop-small",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } },
    },

    // ── Visual: andere Browser ──
    { name: "visual-firefox", testMatch: /visual\.spec\.ts/, use: { ...devices["Desktop Firefox"] } },
    { name: "visual-safari", testMatch: /visual\.spec\.ts/, use: { ...devices["Desktop Safari"] } },

    // ── Visual: Tablets ──
    { name: "visual-ipad-pro", testMatch: /visual\.spec\.ts/, use: { ...devices["iPad Pro 11"] } },
    { name: "visual-ipad-mini", testMatch: /visual\.spec\.ts/, use: { ...devices["iPad Mini"] } },

    // ── Visual: Smartphones ──
    { name: "visual-iphone-14", testMatch: /visual\.spec\.ts/, use: { ...devices["iPhone 14 Pro"] } },
    { name: "visual-iphone-se", testMatch: /visual\.spec\.ts/, use: { ...devices["iPhone SE"] } },
    { name: "visual-pixel-7", testMatch: /visual\.spec\.ts/, use: { ...devices["Pixel 7"] } },
    { name: "visual-galaxy-s9", testMatch: /visual\.spec\.ts/, use: { ...devices["Galaxy S9+"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});