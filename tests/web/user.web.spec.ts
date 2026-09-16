
import { test, expect } from  '../../tests/fixtures';
import { generateTestUser } from '../../helpers/generateTestUser';
import { WebAssertions } from '../../utils/web/assertions';

test.describe('Sauce Demo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Complete purchase flow @smoke', async ({ pageManager }) => {
    const productPage = pageManager.productPageInstance();
    const cartPage = pageManager.cartPageInstance();
    const checkoutPage = pageManager.checkoutPageInstance();

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
