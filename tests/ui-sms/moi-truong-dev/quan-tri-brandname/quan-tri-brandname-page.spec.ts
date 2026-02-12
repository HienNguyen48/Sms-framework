import { test, expect } from "@playwright/test";
import { LoginPageSMS } from "../../../../src/pom/moi-truong-dev/page/cms2018/login/login.page";
import { BrandnamePage } from "../../../../src/pom/moi-truong-dev/page/cms2018/brandname/brandname.page";

const userNameSuccess = "test.admin";
const passWordSuccess = "Abc123456@";
let newBrandname: string;
let fromdate = "09/01/2026";
let todate = "10/01/2026";
let khachHang = "iris";


test.describe("Brandname", async () => {
    test("Mở màn hình thêm mới brandname", async ({ page }) => {

        await test.step("Navigate Brandname", async () => {
            let loginPageSMS = new LoginPageSMS(page);
            await loginPageSMS.openLoginPage();
            await loginPageSMS.login(userNameSuccess, passWordSuccess);
            await loginPageSMS.verifySuccess();
        })

        const brandnamePage = new BrandnamePage(page);
        await test.step("Mở màn hình Danh sách Brandname", async () => {
            await brandnamePage.gotoBrandnamePage();
        })

        await test.step("Click Thêm mới => mở ra màn hình thêm mới", async () => {
            await brandnamePage.clickBtnThemMoi();
        })

        await test.step("Fill thông tin trên màn hình thêm mới", async () => {
            const  {brandname} = await brandnamePage.generateRandomDataNumber("iris_");
            newBrandname = brandname;
            await brandnamePage.Addbrandname("iris", brandname);
            await brandnamePage.applyAllTelcoConfig(["VIETTEL", "VINA", "ITELECOM", "REDDI"]);
            await brandnamePage.checkBtnCaiDat();
            await brandnamePage.clikBtnXacNhanThemMoiBrandname();
        })

        await test.step("Tìm kiếm & verify brandname đã thêm mới trên danh sách brandname", async()=>{
            await brandnamePage.searchBrandnameInTable(fromdate, todate, khachHang, newBrandname );
            // await brandnamePage.verifyBrandnameAddSuccess("iris", newBrandname);
        })

        
    })
})

test.describe.skip("Brandname - Search", async () => {
    test("Tìm kiếm brandname tồn tại trên danh sách ", async ({ page }) => {

        await test.step("Navigate Brandname", async () => {
            let loginPageSMS = new LoginPageSMS(page);
            await loginPageSMS.openLoginPage();
            await loginPageSMS.login(userNameSuccess, passWordSuccess);
            await loginPageSMS.verifySuccess();
        })

        const brandnamePage = new BrandnamePage(page);
        await test.step("Mở màn hình Danh sách Brandname", async () => {
            await brandnamePage.gotoBrandnamePage();
        })

        await test.step("Tìm kiếm & verify brandname đã thêm mới trên danh sách brandname", async()=>{
            const newBrandname = 'iris__13866';
            await brandnamePage.searchBrandnameInTable(fromdate, todate, khachHang, newBrandname );
            // await brandnamePage.verifyBrandnameAddSuccess("iris", newBrandname);
        })
    })
})