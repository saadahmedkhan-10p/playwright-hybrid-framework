import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.checkoutButton);
  }
}