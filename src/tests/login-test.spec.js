const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page.js');
const env = require('dotenv').config();

const credentials = {
    emailz: process.env.emailz,
    password: process.env.password,
};

test('LO_2 - (+) Open Login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveTitle("Customer Login | monotaro.id")
    await expect(loginPage.headerLogo).toHaveAttribute('src', /\bLogo-MID-header-white\b/);
    await expect(loginPage.emailLoginField).toBeVisible()
    await expect(loginPage.passwordLoginField).toBeVisible()
    await expect(loginPage.emailLoginField).toBeEditable()
    await expect(loginPage.passwordLoginField).toBeEditable()
});

test('LO_3 - (+) Login with valid email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailLoginField.fill(credentials.emailz);
    console.log(credentials.emailz)
    console.log(credentials.password)
    await loginPage.passwordLoginField.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page.getByText("Hello, Mosa Mono")).toBeVisible();
});

test('LO_4 - (-) Login with invalid email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailLoginField.fill('androx@gmail.com');
    await loginPage.passwordLoginField.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});

test('LO_5 - (-) Login with valid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailLoginField.fill(credentials.emailz);
    await loginPage.passwordLoginField.fill('Vasdsddad');
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});

test('LO_6 - (-) Login with invalid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailLoginField.fill('androx@gmail.com');
    await loginPage.passwordLoginField.fill('Vasdsddad');
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});