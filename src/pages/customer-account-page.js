const { expect } = require('@playwright/test');

exports.CustomerAccountPage = class CustomerAccountPage {
    constructor(page) {
        this.page = page;
        this.greetings = "x"
    }
};