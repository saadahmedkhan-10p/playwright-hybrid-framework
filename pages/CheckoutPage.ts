import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private confirmationMessage = '.complete-header';

  constructor(page: Page) {
    super(page);
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.page.click(this.continueButton);
  }

  async clickFinish(): Promise<void> {
    await this.page.click(this.finishButton);
  }

  async getOrderConfirmationMessage(): Promise<string | null> {
    return await this.getTextContent(this.confirmationMessage);
  }
}