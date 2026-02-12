import { Page } from "@playwright/test";

export class GeneralBasePageSMS {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage() {
        await this.page.goto("http://192.168.1.9:40101/Account/Login?ReturnUrl=%2F");
    }

    async gotoPage(menuPage: string) {
        const menu = this.page.locator(
            `//*[self::a or self::span][normalize-space()='${menuPage}']`
        ).first();

        await menu.scrollIntoViewIfNeeded();
        await menu.click({ force: true });
    }

    //     async gotoPage(menuPage: string) {
    //         const menu = this.page.locator(
    // `//a[.//span[normalize-space()='${menuPage}']] | //span[normalize-space()='${menuPage}']`);

    //         await menu.waitFor({ state: 'visible', timeout: 15000 });
    //         await menu.click();
    //     }

    async generateRandomDataNumber(baseName: string) {
        const randomNumber = Math.floor(Math.random() * 100000); // 0 → 99999
        const brandname = `${baseName}_${randomNumber}`;
        return { brandname };
    }
}