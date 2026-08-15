const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const { mkdir } = require('fs/promises');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function generate() {
  const baseURL = process.env.BASE_URL;
  const username = process.env.AUTH_USER || 'standard_user';
  const password = process.env.AUTH_PASS || 'secret_sauce';

  if (!baseURL) {
    console.error('BASE_URL not set in .env');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  console.log(`Navigating to ${baseURL} and logging in as ${username}`);
  await page.goto('/');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await page.waitForURL(/inventory/);

  const storageStatePath = path.resolve(__dirname, '..', 'tests', '.auth', 'user.json');
  await mkdir(path.dirname(storageStatePath), { recursive: true });
  await context.storageState({ path: storageStatePath });
  await browser.close();
  console.log(`Saved storage state to ${storageStatePath}`);
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
