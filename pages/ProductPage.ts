import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
 

  readonly backpackAddToCartButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCartButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }
}