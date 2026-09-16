import { test, expect } from '../fixtures';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { generateTestUser } from '../../helpers/generateTestUser';
import { WebAssertions } from '../../utils/web/assertions';

test.describe('Mobile Checkout Flow on SauceDemo', () => {
  test('Complete purchase on mobile', async ({ page, pageManager }) => {
    const productPage: ProductPage = pageManager.productPageInstance();
    const cartPage: CartPage = pageManager.cartPageInstance();
    const checkoutPage: CheckoutPage = pageManager.checkoutPageInstance();

    await test.step('Open authenticated inventory', async () => {
      await page.goto('/inventory.html');
      await expect(page).toHaveURL(/inventory/);
    });

    await test.step('Add product to cart and proceed to checkout', async () => {
      await productPage.addBackpackToCart();
      await productPage.openCart();
      await cartPage.proceedToCheckout();
    });

    const { firstName, lastName, postalCode } = generateTestUser();

    await test.step('Enter checkout information', async () => {
      await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Finish checkout and validate confirmation', async () => {
      await checkoutPage.clickFinish();

      const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
      expect(confirmationMessage).toBe(WebAssertions.thankyouMsg);

      // Screenshot after success
      await page.screenshot({ path: 'screenshots/mobile-confirmation.png', fullPage: true });
    });
  });
});
