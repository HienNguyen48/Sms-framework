import { expect, Page } from "@playwright/test";
import { GeneralBasePageSMS } from "../genaral/material-page";

export class LoginPageSMS extends GeneralBasePageSMS {

    xpathUserName = "//input[@id='txtEmail']";
    xpathPassWord = "//input[@id='txtPassword']";
    xpathRemember = "//label[.//input[@id='cbRemember']]";
    xpathBtnLogin = "//button[@id='m_login_signin_submit']";
    xpathFormLogin = "div.m-login";
    xpathErrorMessage = "//div[@role='alert']";
    xpathTitleTrangChu = "//span[contains(text(),'Trang chủ')]";

    constructor(page: Page) {
        super(page);
    }

    async openLoginPage() {
        await this.page.goto("http://192.168.1.9:40101/Account/Login?ReturnUrl=%2F", { waitUntil: "networkidle" });
        await expect(this.page.locator(this.xpathBtnLogin)).toBeVisible();
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillPassWord(password: string) {
        await this.page.locator(this.xpathPassWord).fill(password);
    }

    // async checkRememberMe() {
    //     const checkbox = await this.page.locator(this.xpathRemember);
    //     if (!(await checkbox.isChecked())) {
    //         await checkbox.check();
    //     }
    // }

    async submitLogin() {
        await this.page.locator(this.xpathBtnLogin).click();
    }

    async login(username: string, password: string) {
        await this.fillUserName(username);
        await this.fillPassWord(password);
        // await this.checkRememberMe();
        await this.submitLogin();
    }

    async verifyLoginFail(expectMessage: string) {
        const msgError = this.page.locator(this.xpathErrorMessage)
        await expect(msgError).toBeVisible();
        await expect(msgError).toContainText(expectMessage);
    }

    async verifySuccess() {
        await expect(this.page).toHaveURL(/192\.168\.1\.9:40101/, { timeout: 15000 });
    }

    async getFillUserName() {
        return this.page.inputValue(this.xpathUserName);
    }

    async getFillPassWord() {
        return this.page.inputValue(this.xpathPassWord);
    }

}