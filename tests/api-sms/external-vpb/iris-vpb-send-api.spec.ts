import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture"

let access_token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjMwMjYyMzUsImV4cCI6MTc2MzAyODAzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.wfm3r7Zfoyr7MrVbkslKPGJ1_iFHmJjullsgnGRS9kY";
const grant_type: string = 'password';
const username: string = 'iris';
const password: string = 'iris@123';
const from: string = 'IRIS';
const to: string = "84374619213";
const textInvalid: string = "Text of the message that will be sent.";
const unicode: string = "0";
const dlr: string = "1";
const contentid: string = "6";
const duplicateMessage: string = "tin nhắn trùng lặp";

test.describe('VPB - Send - UNHAPPY CASE', { tag: ['@vpb', '@unhappy'] }, () => {

    test.beforeEach('Testcase 1: Get token', async ({ loginAPI }) => {
        // ---------------- TESTCASE 01 ----------------
        // loginAPITest = new LoginAPITest(request);
        const response = await loginAPI.UserLoginMTTest(grant_type, username, password);

        const statusCode = response.status();
        expect(statusCode).toBe(200);
        console.log(`status code: ${response.status()}`);

        access_token = (await response.json()).access_token;
        expect(access_token).toBeDefined();
        expect(access_token.length).toBeGreaterThan(0);
        console.log(`access_token: ${access_token}`);

        //In ra 20 kí tự đầu tiên của token nếu không muốn in toàn bộ token thì sẽ dùng câu lệnh này 
        console.log(`Logged in successfully, token: ${access_token.substring(0, 20)}...`);
    });

    // ---------------- TESTCASE 02 ----------------
    test("Testcase 02: STB Send - 40: Unauthorized", async ({ vpbSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");

        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 02: Mã lỗi 40: Unauthorized => Gửi tin lần ${i} có: \n 👉 smsId: ${smsId}`);

            const responses = await vpbSendingAPI.VPBSending(
                from,
                to,
                message,
                unicode,
                dlr,
                smsId,
                contentid
            );

            console.log("👉 Status thực tế:", responses.status());
            expect(responses.status()).toBe(200);

            const body = await responses.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));

            // const { status, mnp, carrier, errorcode, description } = body;

            // console.log("📩 Response:", { status, mnp, carrier, errorcode, description });
            expect(body.status).toBe(0);
            expect(body.errorcode).toBe(40);
            expect(body.description).toBe("Unauthorized");


            console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 200");
            console.log("\n" + "=".repeat(100) + "\n");
        }
    });
});
