import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");

  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("register-link").click();

  await page.getByTestId("first-name").fill("Jack");
  await page.getByTestId("last-name").fill("Sparrow");
  await page.getByTestId("dob").fill("1990-03-29");
  await page.getByTestId("street").fill("123 main st");
  await page.getByTestId("postal_code").fill("12345");
  await page.locator("#city").fill("Irvine");
  await page.getByPlaceholder("Your State *").fill("CA");
  await page.locator("#country").selectOption("AL");
  await page.getByLabel("Phone").fill("5621234597");
  await page.getByLabel("Email address").fill("aa@b.com");
  await page.getByLabel("Password").fill("!Aaaaa23456Ab!");
});
test("create account", async ({ page }) => {
  await page.getByRole("button", { name: /register/i }).click();
  await expect(page).toHaveURL("/auth/login");
});

test("create account with city error", async ({ page }) => {
  await page.locator("#city").fill("");
  await page.getByRole("button", { name: /register/i }).click();
  await expect(page.getByText("City is required")).toBeVisible();
});

test("create account with password error", async ({ page }) => {
  await page.getByLabel("Password").fill("A123456Ab");
  await page.getByRole("button", { name: /register/i }).click();

  await expect(
    page.getByText("Password can not include invalid characters.")
  ).toBeVisible();
});
