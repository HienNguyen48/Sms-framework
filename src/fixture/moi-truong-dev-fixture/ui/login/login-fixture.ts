import { test as base, expect } from '@playwright/test';
import { LoginPageSMS } from 'src/pom/moi-truong-dev/page/cms2018/login/login.page';

type LoginFixtureUI = {
    loginPage: LoginPageSMS;
    accessToken: string;

}

export const test = base.extend<LoginFixtureUI>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPageSMS(page);
        await use(loginPage);
    },

    accessToken: async ({ page, loginPage }, use) => {
        //Mở login page
        await loginPage.openLoginPage();

        //login
        await loginPage.login("", "");

        //Đợi refirect về trang chủ 
        await page.waitForLoadState('networkidle');

        //Lấy token
        const token = await page.evaluate(() => {
            return localStorage.getItem("accessToken");

        });

        if (!token) {
            throw new Error('❌ Không lấy được access token từ UI');
        }
        await use(token);
    }

});
export { expect };




