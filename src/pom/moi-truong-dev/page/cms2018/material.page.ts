import { Page } from "@playwright/test";

//Chứa hành động & thuộc tính mà tất cả các page có thể dùng chung được
export class MaterialPage {
    xpathBlockAds = "div#ads-here";
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateTo(pageName: string){
       await this.page.goto("https://material.playwrightvn.com/");
       await this.page.click(`//a[contains(text(),'${pageName}')]`); //${pageName} => gọi là biến 
    }
}