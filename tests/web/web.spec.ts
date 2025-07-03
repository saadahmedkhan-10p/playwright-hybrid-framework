import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { userData } from '../../utils/web/testData';
import { generateTestUser } from '../../helpers/generateTestUser';
import { WebAssertions } from '../../utils/web/assertions';

test.describe('Sauce Demo Checkout Flow', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigateTo('/');
  });

  test('[Smoke] Complete purchase flow', async () => {
    await loginPage.login(userData.username, userData.password);
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
