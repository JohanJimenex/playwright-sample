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

  //Sin usar POM
  test("Login with valid credentials 2", async ({ page }) => {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  });

  //Usando POM
  test("Login with valid credentials", async ({ page }) => {
    await loginPage.Login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.Login("klk", "klk");
    const isVisible = await page.isVisible('[data-test="error"]');
    expect(isVisible).toBeTruthy();
  });

  test("Login with invalid username", async ({ page }) => {
    await loginPage.Login("klk", "secret_sauce");

    // const isVisible = await page.isVisible('[data-test="error"]');
    const isVisible = await page.$('[data-test="error"]');
    expect(isVisible).toBeTruthy();
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
