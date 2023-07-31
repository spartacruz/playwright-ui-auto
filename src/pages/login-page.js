const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.headerLogo = page.locator("xpath=//img[@title='Logo MID header']");
        this.headerLanguageDropdown = page.locator('#language-change span');
        this.emailLoginField = page.locator('#email');
        this.passwordLoginField = page.locator('#password');
        this.loginButton = page.locator("xpath=//button[@type='submit']");
        this.loginWithGoogle = page.locator("xpath=//button//*[contains(text(), 'Login dengan Google')]");
    }

    async goto() {
        await this.page.goto('https://www.monotaro.id/customer/account/login/');
    }
};