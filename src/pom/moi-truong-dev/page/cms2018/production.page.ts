import { Page } from "@playwright/test";
import { MaterialPage } from "./material.page";

export class ProductPage extends MaterialPage{

    //Viết 1 hàm khi báo những locator giống nhau vào chung 1 hàm => sử dụng biến dynamic 
    getLocatorBtnAddToCar(productName: string){
        return `//div[text() ='${productName}']//following-sibling::button`;
    }

    constructor(page: Page){
        super(page); //kế thừa từ cha 
        
    }

    //Dùng 1 hàm kế thừa từ thằng cha 
    async navigateProductpage (){
        await this.navigateTo("Product page")
         
    }

    //Check xem những cái nào là biến động & có expath giống nhau thì khởi tạo ra 1 hàm để k lặp code 
    async AddproductTocart(productName: string, quantity: number){
        //để click động thì dùng biến dynamic clickCount: quantity để lấy ra số lần click mong muốn
        await this.page.locator(this.getLocatorBtnAddToCar(productName)).click({clickCount : quantity});
    } 
    }