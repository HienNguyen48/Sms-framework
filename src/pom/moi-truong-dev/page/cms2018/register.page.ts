import { Page } from "@playwright/test";
import { MaterialPage } from "./material.page";

export class RegisterPage extends MaterialPage{

    locatorFillFileUsername = "#username";
    locatorFillEmail = "#email";

    constructor(page: Page){
        super(page); //kế thừa từ cha 
        
    }

    //Dùng 1 hàm kế thừa từ thằng cha 
    async navigatoToRegisterpage (){
         //this. sẽ hiển thị tất cả thuộc tính của class cha & của class con
         //Sau này muốn sửa tên Register Page chỉ cần sang hàm navigateTo ở class cha material sửa là hàm class con này sẽ update theo 
        await this.navigateTo("Register Page"); //this. sẽ hiển thị tất cả thuộc tính của class cha & của class con
    }

    //Truyền biến động username để có thể dùng động 
    async fillUsername(username : string){
        //this.locatorFillFileUsername => gọi .locatorFillFileUsername ở phần khai báo biến xuống
        await this.page.locator(this.locatorFillFileUsername).fill(username);
    }

    async fillEmail(email : string){
        //this.locatorFillFileUsername => gọi .locatorFillFileUsername ở phần khai báo biến xuống
        await this.page.locator(this.locatorFillEmail).fill(email);
    }
        
    }