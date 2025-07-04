import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';
import { CartPage } from '../../../pages/CartPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test.describe('📱 Mobile Checkout Flow on SauceDemo', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateTo('/');
      await expect(page).toHaveURL(/saucedemo/);
      await page.screenshot({ path: 'screenshots/mobile-login.png', fullPage: true });
    });
  });

  test('🛒 Complete purchase on mobile', async ({ page }) => {
    await test.step('Login with valid user', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(page).toHaveURL(/inventory/);
    });

    await test.step('Add product to cart and proceed to checkout', async () => {
      await productPage.addBackpackToCart();
      await productPage.openCart();
      await cartPage.proceedToCheckout();
    });

    const timestamp = Date.now();
    const firstName = `Jane${timestamp}`;
    const lastName = `Doe${timestamp}`;
    const postalCode = `${Math.floor(10000 + Math.random() * 90000)}`;

    await test.step('Enter checkout information', async () => {
      await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Finish checkout and validate confirmation', async () => {
      await checkoutPage.clickFinish();

      const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
      expect(confirmationMessage).toBe('Thank you for your order!');

      // Screenshot after success
      await page.screenshot({ path: 'screenshots/mobile-confirmation.png', fullPage: true });
    });
  });
});
