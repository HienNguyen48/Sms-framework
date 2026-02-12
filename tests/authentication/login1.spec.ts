import { test} from "@playwright/test";
import { asyncWrapProviders } from "node:async_hooks";

test("Login vào MH home page", async({page}) => {
    await test.step("Navigate to log", async() => {
        await page.goto("https://alpha-admin.irismedia.vn/Brandname/BrandnameB2BManagerV2");
    })
})