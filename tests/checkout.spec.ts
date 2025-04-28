import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
});

//Issues with fill in the state steps in this test case
test("checkout", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('img[alt="Pliers"]').click();
  await page.getByRole("button", { name: /add to cart/i }).click();
  await page.getByTestId("nav-cart").click();
  await page.getByRole("button", { name: /Proceed to checkout/i }).click();

  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";

  await page.getByRole("textbox", { name: /email/i }).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByTestId("login-submit").click();
  await page.getByRole("button", { name: " Proceed to checkout " }).click();
  await page.getByPlaceholder("State *").fill("California");
  await page.getByRole("textbox", { name: "Postal code" }).fill("12345");
  await page.getByRole("button", { name: /proceed to checkout/i }).click();
  await page
    .getByRole("combobox", { name: "Payment Method" })
    .selectOption("buy-now-pay-later");

  await page
    .getByRole("combobox", { name: "Monthly Installments" })
    .selectOption("3");
  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.getByText("Payment was successful")).toBeVisible();
});

test("GET /products/{id}", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const getProductResponse = await request.get(
    apiUrl + "/products/search?q=pliers"
  );
  expect(getProductResponse.status()).toBe(200);
  const productBody = await getProductResponse.json();
  const productId = productBody.data[0].id;

  const response = await request.get(apiUrl + "/products/" + productId);

  expect(response.status()).toBe(200);
  const body = await response.json();

  expect(body.in_stock).toBe(true);
  expect(body.is_location_offer).toBe(false);
  expect(body.is_rental).toBe(false);
  expect(body.name).toBe("Combination Pliers");
  expect(body.price).toBe(14.15);
});``
