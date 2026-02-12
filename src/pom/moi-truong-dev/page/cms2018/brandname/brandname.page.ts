import { expect, Page } from "@playwright/test";
import { GeneralBasePageSMS } from "../genaral/material-page";

export class BrandnamePage extends GeneralBasePageSMS {
    xpathBtnThemmoi = "//span[contains(text(), 'Thêm mới')]";
    CssClickComboboxKH = "//label[contains(normalize-space(),'Khách hàng')]/following::span[contains(@class,'select2-selection')][1]";
    // inputKhachHang = "";
    inputBrandname = "input#txtBrandname";
    xpathBtnKiemTra = "//button[@onclick='CheckExistBrandName()' and text()='Kiểm tra']";
    inputNgayhethan = "//input[@id='txtExpDate']";
    inputGhiChu = "//textarea[@id='txtNote']";
    xpathBtnLuu = "//button[@class = 'btn btn-primary' and text() =' Lưu']";
    xpathBtnCaiDat = "button#btnBrandnameSettings";
    xpathBtnXacNhanThemMoiBrandname = "//button[@type='button' and contains(text(),'Xác nhận !')]";
    xpathBtnBoQuaThemMoiBrandname = "//button[@type='button' and contains(text(),'Bỏ qua!')]";
    checkTelco = {
        VIETTEL: 'Viettel', VINA: 'Vinaphone', MOBIFONE: 'Mobifone', VIETNAMOBILE: 'Vietnamobile', GTEL: 'GTel', ITELECOM: 'ITelecom', REDDI: 'Reddi'
    };
    checkNCC = {
        NCC_IRIS: 'IRIS',
        NCC_GAPIT: 'GAPIT',
        NCC_VMG: 'VMG',
        NCC_SOUTHTELECOM: 'SOUTHTELECOM',
        NCC_VIETGUYS: 'VIETGUYS',
        NCC_INCOM: 'INCOM',
        NCC_NEO: 'NEO',
        NCC_CMC: 'CMC',
        NCC_VNET: 'VNET',
        NCC_HNI: 'HNI',
        NCC_HNI_PVCB: 'HNI-PVCB',
        NCC_PROVIONE: 'PROVIONE',
        NCC_Vietnamobile: 'Vietnamobile',
        NCC_Viettel: 'Viettel',
        NCC_ViettelBankplus: 'ViettelBankplus',
        NCC_VNPTVAS: 'VNPTVAS',
        NCC_Gtel: 'Gtel',
        NCC_HGC: 'HGC',
        NCC_MVAS: 'MVAS',
        NCC_MinhThanh: 'MinhThanh',
        NCC_VNPAY: 'VNPAY'
    };
    checkGroup = {
        GROUP_TC_CK_BH: 'Tài chính, chứng khoán, bảo hiểm',
        GROUP_YT_GD: 'Y tế, giáo dục',
        GROUP_Khac: 'Khác',
        GROUP_NH: 'Ngân hàng',
        GROUP_NL: 'Năng lượng',
        GROUP_CN: 'Công nghiệp',
        GROUP_MXH: 'Mạng xã hội',
        GROUP_TMDT: 'Thương mại điện tử',
        GROUP_GX: 'Gọi xe'
    }
    Telco_Provider_Group = {
        VIETTEL: [
            { provider: 'NCC_GAPIT', group: 'GROUP_TC_CK_BH' },
            { provider: 'NCC_IRIS', group: 'GROUP_NH' },
            { provider: 'NCC_VMG', group: 'GROUP_MXH' },
            { provider: 'NCC_NEO', group: 'GROUP_TMDT' }
        ],
        VINA: [
            { provider: 'NCC_MinhThanh', group: 'GROUP_GX' },
            { provider: 'NCC_VNPAY', group: 'GROUP_YT_GD' },
            { provider: 'NCC_Gtel', group: 'GROUP_NL' }
        ],
        ITELECOM: [
            // { provider: 'NCC_VIETGUYS', group: 'GROUP_GX' },
            { provider: 'NCC_HGC', group: 'GROUP_YT_GD' },
            { provider: 'NCC_ViettelBankplus', group: 'GROUP_NL' },
            { provider: 'NCC_PROVIONE', group: 'GROUP_Khac' }
        ],
        REDDI: [
            { provider: 'NCC_INCOM', group: 'GROUP_Khac' },
        ]

    }
    constructor(page: Page) {
        super(page);
    }
    async gotoBrandnamePage() {
        await this.gotoPage("Dịch vụ Brandname");
        await this.gotoPage("Quản trị và cài đặt");
        await this.gotoPage("Brandname B2B");

        await expect(
            this.page.locator("text=Quản trị Brandname B2B")
        ).toBeVisible({ timeout: 10000 });
    }
    async clickBtnThemMoi() {
        const btnThemMoi = this.page.locator(this.xpathBtnThemmoi);

        await expect(btnThemMoi).toBeVisible();
        await expect(btnThemMoi).toBeEnabled();

        await btnThemMoi.click();

        // chờ input đặc trưng
        await expect(
            this.page.locator(this.inputBrandname)
        ).toBeVisible({ timeout: 10000 });
    }
    async fillKhachHang(khachhang: string) {
        const selectKhachHang = this.page.locator(this.CssClickComboboxKH);
        await selectKhachHang.waitFor({ state: "visible" });
        await selectKhachHang.click();

        //chọn option theo text(iri/ BIDV...)
        const optionKH = this.page.locator(`//li[contains(@class,'select2-results__option') and normalize-space()='${khachhang}']`);
        await optionKH.waitFor({ state: "visible" });
        await optionKH.click();

        await expect(this.page.locator("#select2-dlDoiTac-container")).toHaveText(khachhang);
    }
    async fillBrandname(brandname: string) {
        if (!brandname || brandname.trim() === "") {
            console.log("Vui lòng nhập brandname");
        }
        const brandnameinput = this.page.locator(this.inputBrandname);
        await brandnameinput.waitFor({ state: "visible" });
        await brandnameinput.fill(brandname);

        const buttonKiemTra = this.page.locator(this.xpathBtnKiemTra);
        await buttonKiemTra.click();
    }
    async Addbrandname(khachhang: string, brandname: string) {
        await this.fillKhachHang(khachhang);
        await this.fillBrandname(brandname);
    }
    // async fillEndDate() {
    // }
    async ChecktelcoCheckbox(name: keyof typeof this.checkTelco) {
        const text = this.checkTelco[name];

        const checkboxTelco = this.page.locator(`//input[@name='cbTelco' and @value='${text}']`)
        const label = this.page.locator(`//label[contains(normalize-space(), 'Mở luồng ${text}')]`);

        if (await checkboxTelco.isChecked()) return;
        await label.click();

    }
    async checkCaiDat(telco: keyof typeof this.checkTelco) {
        const text = this.checkTelco[telco];
        const checkCaiDat = this.page.locator(`//button[@onclick="ShowModalConfig('${text}')"]`);
        await expect(checkCaiDat).toBeVisible();
        await checkCaiDat.click();
    }
    async checkNhaCungCap(NCC: keyof typeof this.checkNCC) {
        const text = this.checkNCC[NCC];

        //Form đang mở 
        const openForm = this.page.locator("//div[contains(@class,'modal') and contains(@style,'display: block')]");
        await expect(openForm).toBeVisible({ timeout: 1000 });

        const checkboxUI = this.page.locator(
            `//input[@type='checkbox' and @value='${text}']/ancestor::label`
        );

        if (await checkboxUI.count() === 0) {
            console.warn(`NCC ${text} không tồn tại cho telco hiện tại`);
            return;

        }

        await expect(checkboxUI).toBeVisible({ timeout: 10000 });
        await checkboxUI.click();
    }
    async checkNhom(ncc: keyof typeof this.checkNCC, group: keyof typeof this.checkGroup) {
        const nccText = this.checkNCC[ncc];
        const groupText = this.checkGroup[group];

        //Form đang mở 
        const form = this.page.locator(".modal-content");

        //thêm nhóm theo ncc
        const clickcomboNhom = form.locator(`#select2-ddlGrp${nccText}-container`);
        await expect(clickcomboNhom).toBeVisible({ timeout: 1000 });
        await clickcomboNhom.click();

        const ChonNhom = this.page.locator(`//li[contains(@class,'select2-results__option') and normalize-space()='${groupText}']`);
        await expect(ChonNhom).toBeVisible({ timeout: 1000 });
        await ChonNhom.click();

        await expect(clickcomboNhom).toHaveText(groupText);
    }
    async applyAllTelcoConfig(telcos: string[]) {
        for (const telco of telcos) {
            //click vào các telco
            await this.ChecktelcoCheckbox(telco as keyof typeof this.checkTelco);

            // await this.checkCaiDat(telco as keyof typeof this.checkCaiDat);

            //Lấy ds NCC & group theo telco đã chọn
            //ép kiểu telco(bằng cách dùng as keyof typeof) thành key hợp lệ của object để typescript k báo lỗi
            const listNCC = this.Telco_Provider_Group[telco as keyof typeof this.Telco_Provider_Group];

            //nếu telco k có ncc => bỏ qua 
            if (!listNCC || listNCC.length === 0) continue;
            //lặp qua tất cả các ncc & group 
            for (const item of listNCC) {
                const { provider, group } = item;
                await this.checkCaiDat(telco as keyof typeof this.checkCaiDat);
                //chọn ncc
                await this.checkNhaCungCap(provider as keyof typeof this.checkNCC);
                await this.checkNhom(provider as keyof typeof this.checkNCC, group as keyof typeof this.checkGroup);

                //click Lưu
                const btnLuu = this.page.locator(this.xpathBtnLuu);
                await expect(btnLuu).toBeVisible({ timeout: 10000 });
                await expect(btnLuu).toBeEnabled({ timeout: 1000 });
                await btnLuu.click();

                //Đợi cho form đóng hẳn 
                await this.page.waitForSelector(
                    "//div[contains(@class,'modal') and contains(@style,'display: block')]",
                    { state: 'detached', timeout: 10000 }
                );
            }

        }
    }
    async checkBtnCaiDat() {
        const btnCaiDat = this.page.locator(this.xpathBtnCaiDat);
        await expect(btnCaiDat).toBeVisible();
        await btnCaiDat.click();
    }
    async clikBtnXacNhanThemMoiBrandname() {
        // await this.page.waitForSelector(".swal2-container", {state: "visible"});
        const btnXacNhanThemMoi = this.page.locator(this.xpathBtnXacNhanThemMoiBrandname);
        await expect(btnXacNhanThemMoi).toBeVisible();
        await btnXacNhanThemMoi.click();
    }
    async clickBtnBoQua() {
        const btnBoQua = this.page.locator(this.xpathBtnBoQuaThemMoiBrandname);
        await expect(btnBoQua).toBeVisible();
        await btnBoQua.click();
    }
    async searchBrandnameInTable(fromdate: string, todate: string, khachhang: string, brandname: string) {
        await expect(this.page.getByText("Quản trị Brandname B2B", { exact: true })).toBeVisible({ timeout: 10000 });
        //Chọn thời gian
        const fromDateInput = this.page.locator("//label[contains(text(),'Thời gian ')]//following::input[1]");
        const toDateInput = this.page.locator("//label[contains(text(),'Thời gian ')]//following::input[2]");

        await expect(fromDateInput).toBeVisible({ timeout: 10000 });
        await expect(toDateInput).toBeVisible({ timeout: 10000 });

        await fromDateInput.click({ force: true });
        await fromDateInput.fill(fromdate);
        await fromDateInput.press("Enter");

        await toDateInput.click({ force: true });
        await toDateInput.fill(todate);
        await toDateInput.press("Enter");
        //Đóng time
        await this.page.mouse.click(0, 0);
        await expect(this.page.locator(".datepicker-dropdown:visible")).toHaveCount(0);

        // Chọn Khách hàng
        const clickKH = this.page.locator("span#select2-userName-container");
        await clickKH.click();
        const inputSearch = this.page.locator("input.select2-search__field");
        await inputSearch.waitFor({ state: "visible", timeout: 10000 });
        await inputSearch.fill(khachhang);
        const optionKhachHang = this.page.locator(`li.select2-results__option >> text=${khachhang}`);
        await optionKhachHang.waitFor({ state: "visible", timeout: 10000 });
        await optionKhachHang.click();

        const valueKhachHang = await clickKH.innerText();
        console.log(`Giá trị khách hàng được chọn là: ${valueKhachHang}`);

        //Chọn Brandname
        const clickBrandname = this.page.locator("span#select2-dll_Brandname-container");
        await clickBrandname.click({ force: true });
        const inputSearchBrandname = this.page.locator("input.select2-search__field");
        await inputSearchBrandname.waitFor({ state: "visible", timeout: 10000 });
        await inputSearchBrandname.fill(brandname);
        const optionBrandname = this.page.locator(`li.select2-results__option >> text=${brandname}`);
        await optionBrandname.waitFor({ state: "visible", timeout: 10000 });
        await optionBrandname.click();

        const valueBrandname = await clickBrandname.innerText();
        console.log(`Giá trị brandname được chọn là: ${valueBrandname}`);

        await this.page.locator("//button[@id='btnSearch']").click();
        await this.page.locator("//table//tbody//tr").first().waitFor({ state: "visible" });

    }
    async verifyBrandnameAddSuccess(
        khachhang: string,
        brandname: string,
        telcos: string[] = ["VIETTEL", "VINA", "ITELECOM", "REDDI"]
    ) {
        //  row theo khách hàng
        const rowByCustomer = this.page.locator(`xpath = //td[contains(normalize-space(),'${khachhang}')]//ancestor::tr`);
        await expect(rowByCustomer.first()).toBeVisible({ timeout: 30000 });

        // 2. Trong row này tìm brandname
        const brandnameCell = rowByCustomer.locator(`xpath = .//td[contains(normalize-space(),'${brandname}')]`);
        await expect(brandnameCell.first()).toBeVisible({ timeout: 15000 });

        // 3. Kiểm tra trạng thái Hoạt động
        const statusCell = rowByCustomer.locator(`xpath = .//td[normalize-space()='Hoạt động']`);
        await expect(statusCell.first()).toBeVisible({ timeout: 10000 });

        // 4. Kiểm tra telcos
        for (const telco of telcos) {
            await expect(rowByCustomer.first()).toContainText(telco);
        }
    }
}