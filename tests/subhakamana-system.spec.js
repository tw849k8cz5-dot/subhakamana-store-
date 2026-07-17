import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");

function fileUrl(relativePath) {
  const primary = path.join(projectRoot, relativePath);
  if (relativePath.startsWith("outputs/")) {
    const packageRelative = relativePath
      .replace("outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/", "")
      .replace("outputs/", "");
    const candidates = [
      primary,
      path.join(projectRoot, packageRelative),
      path.join(projectRoot, "prototype-ready", packageRelative),
      path.join(projectRoot, "outputs", "SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17", packageRelative)
    ];
    return pathToFileURL(requireExists(...candidates)).toString();
  }
  return pathToFileURL(primary).toString();
}

function requireExists(...paths) {
  const found = paths.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error(`Missing test target. Checked: ${paths.join(", ")}`);
  return found;
}

const erpUrl = fileUrl("outputs/subhakamana-store-final-erp-platform.html");
const ecommerceUrl = fileUrl("outputs/subhakamana-store-ecommerce.html");
const startUrl = fileUrl("outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/index.html");

async function loginDemo(page) {
  await page.goto(erpUrl);
  await page.selectOption("#loginDataMode", "demo");
  await page.selectOption("#loginRole", "super");
  await page.fill("#loginPin", "0000");
  await page.getByRole("button", { name: /enter system/i }).click();
  await expect(page.locator("#appShell")).toBeVisible();
}

test.describe("Subhakamana Store prototype QA", () => {
  test("ERP opens and demo login reaches dashboard", async ({ page }) => {
    await loginDemo(page);
    await expect(page.locator("#pageTitle")).toContainText("Dashboard");
    await expect(page.getByText("Nepali Calendar")).toBeVisible();
  });

  test("main ERP pages do not create document-level horizontal scroll", async ({ page }) => {
    await loginDemo(page);
    const pages = [
      "dashboard",
      "inventory",
      "products",
      "pos",
      "orders",
      "delivery",
      "payments",
      "purchases",
      "customers",
      "reports",
      "controls",
      "ecommerce",
      "manual",
      "settings"
    ];

    for (const pageName of pages) {
      await page.evaluate((target) => {
        location.hash = target;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }, pageName);
      await page.waitForTimeout(100);
      const overflow = await page.evaluate(() => {
        const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        return width - document.documentElement.clientWidth;
      });
      expect.soft(overflow, `${pageName} has horizontal overflow`).toBeLessThanOrEqual(2);
    }
  });

  test("customer website opens with shop and privacy policy link", async ({ page }) => {
    await page.goto(ecommerceUrl);
    await expect(page.getByText("Tradition You Can Wear")).toBeVisible();
    await expect(page.locator('a[href="subhakamana-store-privacy-policy.html"]')).toBeVisible();
    await page.locator('a[href="#shop"]').first().click();
    await expect(page.locator("#shop")).toBeVisible();
  });

  test("prototype start page links to the three operator entry points", async ({ page }) => {
    await page.goto(startUrl);
    await expect(page.locator('a[href="subhakamana-store-final-erp-platform.html#dashboard"]')).toBeVisible();
    await expect(page.locator('a[href="subhakamana-store-physical-pos.html"]')).toBeVisible();
    await expect(page.locator('a[href="subhakamana-store-ecommerce.html#home"]')).toBeVisible();
  });
});
