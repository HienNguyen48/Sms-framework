import { mergeTests, test as base, expect } from "@playwright/test";
import { test as logindev } from "./login/login-fixture";
import { test as b2b2018sendinglist } from "./external-b2b-2018/b2b-2018-sending-list-fixture";
import { test as randomData } from "./random-data-fixture";
import { test as envEnv } from "./envEnvironment-variables-fixture"
import { test as b2b2023sendinglist } from "./external-b2b-2023/b2b-2023-sending-list-fixture";
import { test as b2b2018send} from "./external-b2b-2023/b2b-2023-send-fixture";

export class APICommonFixture {
    logResponse(name: string, response: any) {
        console.log(`📩 Response from ${name}:`, JSON.stringify(response, null, 2));
    }

    checkStatus200(response: any) {
        expect(response.status()).toBe(200);
    }

    checkCode(responseBody: any, expectedCode: string) {
        expect(responseBody.Code).toBe(expectedCode);
    }

    checkMessage(responseBody: any, expectedMessage: string) {
        expect(responseBody.Message).toBe(expectedMessage);
    }
}

const helperFixture = base.extend<{ apiHelper: APICommonFixture }>({
    apiHelper: async ({ }, use) => {
        await use(new APICommonFixture());
    }
})

export const test = mergeTests(
    base,
    helperFixture,
    logindev,
    b2b2018sendinglist,
    randomData,
    envEnv,
    b2b2023sendinglist,
    b2b2018send
);

export { expect };