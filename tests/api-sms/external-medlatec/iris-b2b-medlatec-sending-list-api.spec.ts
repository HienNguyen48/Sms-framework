import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

let access_token: string = '';
const isCheckDuplicate: string = "1";
const isCheckDuplicate1: string = "0";
const messageType: string = "30";
const brandname: string = 'IRIS';
const brandnameInvalid: string = "hihihi";
const phoneNumber: string = "84374619213";
const phoneNumber2: string = "374619213";
const contentType: string = "1";
const unitId: string = "iristest01";
const telco: string = "";



test.describe('B2B Medlatec - SendingList - UnHappy case', { tag: ['@b2bmedlatec', '@unhappy'] }, () => {

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

    // ---------------- TESTCASE 02 ----------------
    test("Testcase 02: MEDLATEC - SendingList -  Lỗi do UnitId không hợp lệ", async ({ sendMedlatecSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();

        const success0 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": isCheckDuplicate,
                "UnitId": unitId,
                "SmsId": smsId1,
                "PhoneNumber": phoneNumber,
                "Content": content1,
                "ContentType": contentType,
                "Telco": telco
            },
            {
                "Brandname": brandname,
                "IsCheckDuplicate": isCheckDuplicate,
                "UnitId": unitId,
                "SmsId": smsId2,
                "PhoneNumber": phoneNumber,
                "Content": content2,
                "ContentType": contentType,
                "Telco": telco
            }

        ]
        console.log("🚀  Testcase 02: MB - SendingList -  Lỗi do UnitId không hợp lệ");
        console.log(` => SMS 1: Brandname = ${success0[0].Brandname}, SmsId = ${success0[0].SmsId}, Content = ${success0[0].Content}`);
        console.log(` => SMS 2: Brandname = ${success0[1].Brandname}, SmsId = ${success0[1].SmsId}, Content = ${success0[1].Content}`);

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
            expect(Code).toBe("5");
        }

        console.log("✅ Testcase 01 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");

    });

    // ---------------- TESTCASE 03 ----------------
    test(`Testcase 03: MEDLATEC - SendingList -  UnitId rỗng hoặc bị bỏ trống`, async ({ sendMedlatecSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();

        const success03 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": isCheckDuplicate,
                "UnitId": "",
                "SmsId": smsId1,
                "PhoneNumber": phoneNumber,
                "Content": content1,
                "ContentType": contentType,
                "Telco": telco
            }

        ]
        console.log("🚀  Testcase 03: MEDLATEC - SendingList -  UnitId rỗng hoặc bị bỏ trống");
        console.log(` => SMS 1: Brandname = ${success03[0].Brandname}, SmsId = ${success03[0].SmsId}, Content = ${success03[0].Content}`);

        const responses = await sendMedlatecSendingListAPI.SendMedlatecMultiSendingList(success03);

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

        console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");

    });

      // ---------------- TESTCASE 04 ----------------
    test(`Testcase 04: MEDLATEC - SendingList -  SĐT không bắt đầu bằng số 0 hoặc 84`, async ({ sendMedlatecSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();

        const success04 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": isCheckDuplicate,
                "UnitId": "",
                "SmsId": smsId1,
                "PhoneNumber": phoneNumber2,
                "Content": content1,
                "ContentType": contentType,
                "Telco": telco
            }
        ]
        console.log("🚀  Testcase 04: MEDLATEC - SendingList -  SĐT không bắt đầu bằng số 0 hoặc 84");
        console.log(` => SMS 1: Brandname = ${success04[0].Brandname}, SmsId = ${success04[0].SmsId}, Content = ${success04[0].Content}`);

        const responses = await sendMedlatecSendingListAPI.SendMedlatecMultiSendingList(success04);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(200);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        expect(body).toHaveProperty("ResultList");
        expect(Array.isArray(body.ResultList)).toBe(true);

        for (const result of body.ResultList) {
            const { Code, SmsId } = result;
            console.log('📩 Response item:', { Code, SmsId });
            expect(Code).toBe("9");
        }

        console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");

    });


});