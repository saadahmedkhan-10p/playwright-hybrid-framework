
import { test, expect } from  '../../tests/fixtures';
import { generateTestUser } from '../../helpers/generateTestUser';
import { WebAssertions } from '../../utils/web/assertions';

test.describe('Sauce Demo Checkout Flow', () => {
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('[Smoke] Complete purchase flow', async ({ pageManager }) => {
    productPage = pageManager.productPageInstance();
    cartPage = pageManager.cartPageInstance();
    checkoutPage = pageManager.checkoutPageInstance();

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
