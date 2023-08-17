const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page.js');
const env = require('dotenv').config();

const credentials = {
    emailz: process.env.emailz,
    password: process.env.password,
};

test.beforeAll(async () => {
    // Set timeout for this hook.
    test.setTimeout(30000);
});

test('LO_1 - (+) Open Login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.headerLogo).toHaveAttribute('src', /\bLogo-MID-header-white\b/);
    await validationLoginElement(page);
    await validationLoginField(loginPage);
});

test('LO_2 - (+) Login with valid email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.emailLoginField.fill(credentials.emailz);
    await loginPage.passwordLoginField.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page.getByText("Hello, Mosa Mono")).toBeVisible();
});

test('LO_3 - (-) Login with invalid email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.emailLoginField.fill('androx@gmail.com');
    await loginPage.passwordLoginField.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});

test('LO_4 - (-) Login with valid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.emailLoginField.fill(credentials.emailz);
    await loginPage.passwordLoginField.fill('Vasdsddad');
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});

test('LO_5 - (-) Login with invalid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.emailLoginField.fill('androx@gmail.com');
    await loginPage.passwordLoginField.fill('Vasdsddad');
    await loginPage.loginButton.click();
    await expect(page.getByText("Email atau Password salah.")).toBeVisible();
});

test('LO_6 - (-) Login with blank email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.passwordLoginField.fill(credentials.emailz);
    await loginPage.loginButton.click();
    expect(await page.$(loginPage.errorEmailWarningIdLocator)).not.toEqual(null);
    await expect(page.getByText("Harus diisi.")).toBeVisible();
});

test('LO_7 - (-) Login with valid email and blank password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.emailLoginField.fill(credentials.emailz);
    await loginPage.loginButton.click();
    expect(await page.$(loginPage.errorPasswordWarningIdLocator)).not.toEqual(null);
    await expect(page.getByText("Harus diisi.")).toBeVisible();
});

test('LO_8 - (-) Login with blank email and blank password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await validationLoginField(loginPage);
    await loginPage.loginButton.click();
    expect(await page.$(loginPage.errorEmailWarningIdLocator)).not.toEqual(null);
    expect(await page.$(loginPage.errorPasswordWarningIdLocator)).not.toEqual(null);
});






async function validationLoginField(loginPageObj){
    const loginPage = loginPageObj;
    await expect(loginPage.emailLoginField).toBeVisible()
    await expect(loginPage.passwordLoginField).toBeVisible()
    await expect(loginPage.emailLoginField).toBeEditable()
    await expect(loginPage.passwordLoginField).toBeEditable()
}

async function validationLoginElement(pageObj){
    const page = pageObj;
    await expect(page).toHaveTitle("Customer Login | monotaro.id")
    await expect(page.getByText("Sudah Punya Akun?")).toBeVisible();
    await expect(page.getByText("Silahkan login disini")).toBeVisible();
    await expect(page.getByText("Pelanggan Baru?")).toBeVisible();
    await expect(page.getByText("Keuntungan menjadi Akun Bisnis")).toBeVisible();
    await expect(page.getByText("Ingin mengetahui lebih lanjut mengenai monotaro.id?")).toBeVisible();
}