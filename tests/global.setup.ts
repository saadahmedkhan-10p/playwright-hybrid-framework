import { chromium, type FullConfig } from '@playwright/test';
import path from 'path';
import { mkdir } from 'fs/promises';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { userData } from '../utils/web/testData';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

async function globalSetup(_config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL,
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login(userData.username, userData.password);

  await page.waitForURL(/inventory/);

  const storageStatePath = path.resolve(__dirname, '.auth', 'user.json');
  await mkdir(path.dirname(storageStatePath), { recursive: true });
  await context.storageState({ path: storageStatePath });
  await browser.close();
}

export default globalSetup;
