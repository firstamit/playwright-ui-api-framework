import { test, expect } from '@playwright/test';

test('ParaBank homepage shows the customer login panel', async ({ page }) => {
  // 1. Open the ParaBank public demo banking site
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // 2. The browser tab title should contain "ParaBank"
  await expect(page).toHaveTitle(/ParaBank/);

  // 3. The username field should be visible
  await expect(page.locator('input[name="username"]')).toBeVisible();

  // 4. The password field should be visible
  await expect(page.locator('input[name="password"]')).toBeVisible();

  // 5. The "Log In" button should be visible
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});