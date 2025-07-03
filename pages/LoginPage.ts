import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}