import { test as base } from "@playwright/test";
import * as dotenv from "dotenv";
import { url } from "inspector";
import { env } from "process";
import fs from "fs";

//load .env
dotenv.config();

export class EnvEnvironmentVariables {
    //get(key: string) {
    private getEnvPostFix(): string {
        const env = process.env.ENV?.toLowerCase();
        // let keyPostFix: string;

        switch (env) {
            case "dev":
                return "_DEV";
            case "uat":
                return "_UAT";
            case "prod":
                return "_PROD";
            default:
                throw new Error(`ENV không hợp lệ: ${env}. Vui lòng đặt ENV = dev | uat | prod`);
        }
    }

    get(key: string): string {
        const postFix = this.getEnvPostFix();
        const fullKey = `${key}${postFix}`
        const value = process.env[fullKey];

        if (!value) {
            throw new Error(`⚠️ Không tìm thấy biến môi trường: ${fullKey}`);
        }
        return value;
    }

    // Lấy BASE URL theo loại API (OCB, MB, B2B_2018, ...)
    getBaseURL(apiType: string): string {
        const key = `BASE_URL_${apiType.toUpperCase()}`;
        return this.get(key);
    }
    // Lấy tất cả BaseURL của ENV hiện tại
    getAllBaseURLs(): Record<string, string> {
        const postFix = this.getEnvPostFix();
        const urls: Record<string, string> = {};

        Object.keys(process.env).forEach((key) => {
            if (key.startsWith("BASE_URL") && key.endsWith(postFix)) {
                const apiName = key.replace(`BASE_URL_`, "").replace(postFix, "");
                urls[apiName] = process.env[key] as string;
            }
        });

        return urls;
    }

    // (tuỳ chọn) in log ra console
    logEnvironment() {
        console.log("=====================================");
        console.log(`🌍 ENV hiện tại: ${process.env.ENV}`);
        console.log(`👤 USERNAME: ${this.get("USERNAME")}`);
        console.log(`🔑 PASSWORD: ${this.get("PASSWORD")}`);

        //In ra tết cả BaseURL
        const allUrls = this.getAllBaseURLs();
        Object.entries(allUrls).forEach(([api, url]) => {
            console.log(`🔗 ${api}: ${url}`);
        });
        // Ghi ra file JSON
        const filePath = `./all_base_urls_${process.env.ENV}.json`;
        fs.writeFileSync(filePath, JSON.stringify(allUrls, null, 2));
        console.log(`✅ All Base URLs saved to ${filePath}`);
        console.log("=====================================");
    }
}

const test = base.extend<{ envEnvironmentVariables: EnvEnvironmentVariables }>({
    envEnvironmentVariables: async ({ }, use) => {
        const envEnvironmentVariables = new EnvEnvironmentVariables();
        envEnvironmentVariables.logEnvironment();
        await use(envEnvironmentVariables)
    },
});

export { test };