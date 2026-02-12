import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture"
let access_token: string = '';
const isCheckDuplicate: string = "0";
const templateId: string = "1";
const brandname: string = 'IRIS';
const phoneNumber: string = "84904987877";
const p2: string = "1975";
const p3: string = "24/02/2022";
const p4: string = "27 Thai Thinh";
const p5: string = "09:30";

test.describe('Xanh Pon - Sending list - UNHAPPY CASE', { tag: ['@vpb', '@unhappy'] }, () => {
    test.beforeEach('Testcase 1: Get token', async ({ loginAPI }) => {
        const response = await loginAPI.UserLoginMTTest('password', 'iris', 'iris@123');

        const statusCode = response.status();
        expect(statusCode).toBe(200);
        console.log(`status code: ${response.status()}`);

        access_token = (await response.json()).access_token;
        expect(access_token).toBeDefined();
        expect(access_token.length).toBeGreaterThan(0);
        console.log(`access_token: ${access_token}`);

        //In ra 20 kí tự đầu tiên của token nếu không muốn in toàn bộ token thì sẽ dùng câu lệnh này 
        console.log(`Logged in successfully, token: ${access_token.substring(0, 20)}...`);

        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 01 ----------------
    test("Testcase 01: XANHPON - Sending list", async ({ sendMedlatecSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const success0 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": isCheckDuplicate,
                "SmsId": smsId1,
                "PhoneNumber": phoneNumber,
                "TemplateId": templateId,
                "TemplateData": {
                    "P1": content1,
                    "P2": p2,
                    "P3": p3,
                    "P4": p4,
                    "P5": p5
                }
            }

        ]
        console.log("🚀  TTestcase 01: MEDLATEC - SendingList - Success");
        console.log(` => SMS 1: Brandname = ${success0[0].Brandname}, SmsId = ${success0[0].SmsId}, TemplateData = ${JSON.stringify(success0[0].TemplateData)}`);

        const responses = await sendMedlatecSendingListAPI.SendMedlatecMultiSendingList(success0);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(200);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        expect(body).toHaveProperty("ResultList");
        expect(Array.isArray(body.ResultList)).toBe(true);

        for (const result of body.ResultList) {
            const { Code, SmsId } = result;
            console.log('📩 Response item:', { Code, SmsId });
            expect(Code).toBe("4");
        }
        console.log("✅ Testcase 01 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

});