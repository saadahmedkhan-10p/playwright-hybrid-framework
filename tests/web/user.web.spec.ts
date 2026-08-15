
import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { generateTestUser } from '../../helpers/generateTestUser';
import { WebAssertions } from '../../utils/web/assertions';

test.describe('Sauce Demo Checkout Flow', () => {
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');
  });

  test('[Smoke] Complete purchase flow', async ({ page }) => {
    await productPage.addBackpackToCart();
    await productPage.openCart();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = generateTestUser();

    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
    expect(confirmationMessage).toBe(WebAssertions.thankyouMsg);
  });
});
