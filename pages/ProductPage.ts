import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private backpackAddToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private cartButton = '.shopping_cart_link';

  constructor(page: Page) {
    super(page);
  }

  async addBackpackToCart(): Promise<void> {
    await this.page.click(this.backpackAddToCartButton);
  }

  async openCart(): Promise<void> {
    await this.page.click(this.cartButton);
  }
}