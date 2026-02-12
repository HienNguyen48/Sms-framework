import { test, expect } from "@playwright/test";
import { LoginPageSMS } from "../../../../src/pom/moi-truong-dev/page/cms2018/login/login.page";

const userNameSuccess = "test.admin";
const passWordSuccess = "Abc123456@";
const userNameFail = "admin";
const passWordFail = "Abc123456@";

test.describe("Login", async () => {
    test("Login fail", async ({ page }) => {
        let loginPageSMS = new LoginPageSMS(page);

        await test.step("Navigate", async () => {
            await loginPageSMS.openLoginPage();
        })

        await test.step("Nhập thông tin username & password invalid", async () => {
            await loginPageSMS.login(userNameFail, passWordFail);

            const msgError = "Sai tài khoản hoặc mật khẩu";
            await loginPageSMS.verifyLoginFail(msgError);
        });

    });

    test("Login pass", async ({ page }) => {
        let loginPageSMS = new LoginPageSMS(page);

        await test.step("Navigate", async () => {
            await loginPageSMS.openLoginPage();
        })

        await test.step("Nhập thông tin username & password hợp lệ", async () => {
            await loginPageSMS.login(userNameSuccess, passWordSuccess);
            await loginPageSMS.verifySuccess();
        });

    });

})