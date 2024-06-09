// @ts-check
const { test, expect } = require("@playwright/test");
const { beforeEach } = require("node:test");
import LoginPage from "./POM/LoginPage";

const urlApp = "https://www.saucedemo.com/v1/index.html";

test.describe("Login Test Cases", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(urlApp);
  });

  //Usando POM
  test("Login with valid credentials con POM", async ({ page }) => {
    await loginPage.Login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  });

  //Sin POM
  test("Login with invalid credentials sin POM", async ({ page }) => {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  });
});

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
