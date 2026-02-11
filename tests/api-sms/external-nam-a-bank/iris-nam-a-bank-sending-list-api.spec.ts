import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

let access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjI5MzQyNzUsImV4cCI6MTc2MjkzNjA3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.LaXUWwfNhBB6p2QePGWQTtoqCTlgW24gElAnMNNjZaA';
const isCheckDuplicate: string = "1";
const isCheckDuplicate1: string = "0";
const brandname: string = 'IRIS';
const phoneNumber: string = "84374619213";
const contentType: string = "30";

const priority = [
    { "name": "Cao", "value": 10 },
    { "name": "Trung Bình", "value": 5 },
    { "name": "Thấp", "value": 1 }
]

const SmsType = [
    { "name": "Tin OTP", "value": 1 },
    { "name": "Tin biến động", "value": 2 },
    { "name": "Tin khác", "value": 3 }
]

test.describe('NAMABANK - SendingList - UNHAPPY CASE', { tag: ['@namabank', '@unhappy'] }, () => {

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


    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    const highPriority = priority.find(p => p.name === "Cao")!;
    const lowPriority = priority.find(p => p.name === "Thấp")!;
    const smsType1Value = SmsType.find(s => s.name === "Tin OTP")!.value;
    const smsType2Value = SmsType.find(s => s.name === "Tin biến động")!.value;
    const smsType3Value = SmsType.find(s => s.name === "Tin khác")!.value;

    // ---------------- TESTCASE 03 ----------------
    test(`Testcase 03: NAMABANK - SendingList -  Brandname is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const brandnameIsInvalid = "mama";

        const BrandnameInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandnameIsInvalid,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType3Value.toString()
                }

            ]
        }

        console.log(`🚀  Testcase 03: NAMABANK - SendingList -  Brandname is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value}): ${JSON.stringify(BrandnameInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(BrandnameInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Brandname or telco is invalid");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
                { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 },
                { Telco: Telco3, SmsId: SmsId3, IsMnp: IsMnp3 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
            console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });
            console.log("📩 Result 3:", { Telco3, SmsId3, IsMnp3 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 04 ----------------
    test(`Testcase 04: NAMABANK - SendingList -  Telco is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const telcoIsInvalid = "sdsadasdsadsa";

        const TelcoInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString(),
                    "Telco": telcoIsInvalid
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType3Value.toString(),
                    "Telco": ""
                }

            ]
        }

        console.log(`🚀  Testcase 04: NAMABANK - SendingList -  Telco is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value}): ${JSON.stringify(TelcoInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(TelcoInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Brandname or telco is invalid");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
                { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 },
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
            console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 05 ----------------
    test(`Testcase 05: NAMABANK - SendingList -  Brandname is missing ${MediumPriority.name} có smsType = (${smsType2Value}`, async ({ namABankSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();

        const TelcoInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": "",
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 05: NAMABANK - SendingList -  Brandname is missing ${MediumPriority.name} có smsType = (${smsType2Value}: ${JSON.stringify(TelcoInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(TelcoInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Brandname is missing");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 05 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 06 ----------------
    test(`Testcase 06: NAMABANK - SendingList -  SmsId is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { content: content1 } = generateRandomData();

        const smsIdInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": "",
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 06: NAMABANK - SendingList -  SmsId is invalid ${MediumPriority.name} có smsType = ${smsType2Value}: ${JSON.stringify(smsIdInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(smsIdInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SmsId is invalid");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 06 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 07 ----------------
    test(`Testcase 07: NAMABANK - SendingList -  PhoneNumber is invalid ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const phoneNumberIsInvalid = "8425623222222222"

        const smsIdInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumberIsInvalid,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 07: NAMABANK - SendingList - PhoneNumber is invalid ${MediumPriority.name} có smsType = ${smsType2Value}: ${JSON.stringify(smsIdInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(smsIdInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("PhoneNumber is invalid");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 07 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 08 ----------------
    test(`Testcase 08: NAMABANK - SendingList -  PhoneNumber is missing ${MediumPriority.name} có smsType = (${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();

        const smsIdInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": "",
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 08: NAMABANK - SendingList - PhoneNumber is missing ${MediumPriority.name} có smsType = ${smsType2Value}: ${JSON.stringify(smsIdInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(smsIdInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("PhoneNumber is missing");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 08 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 09 ----------------
    test(`Testcase 09: NAMABANK - SendingList -  Content is missing ${MediumPriority.name} có smsType = (${smsType2Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();

        const contentIsMissing = {
            "IsCheckDuplicate": isCheckDuplicate1,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": "",
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 09: NAMABANK - SendingList -  Content is missing ${MediumPriority.name} có smsType = (${smsType2Value}): ${JSON.stringify(contentIsMissing, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(contentIsMissing);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Content is missing");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 09 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 10 ----------------
    test(`Testcase 10: NAMABANK - SendingList -  Content is Invalid ${MediumPriority.name} có smsType = (${smsType2Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1 } = generateRandomData();
        //nội dung trên 1000 ký tự 
        let longContent = generateRandomData().content + "A".repeat(1001);

        const contentIsInvalid = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": longContent,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 10: NAMABANK - SendingList -  Content is Invalid ${MediumPriority.name} có smsType = (${smsType2Value}): ${JSON.stringify(contentIsInvalid, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(contentIsInvalid);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Content is invalid");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 10 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 11 ----------------
    test(`Testcase 11: NAMABANK - SendingList -  Message is rejected ${MediumPriority.name} có smsType = (${smsType2Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1 } = generateRandomData();

        const { content } = generateRandomData();
        const insertPos = Math.floor(Math.random() * content.length);
        const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);

        const Messageisrejected = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": contentWithQC,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 11: NAMABANK - SendingList -  Message is rejected ${MediumPriority.name} có smsType = (${smsType2Value}): ${JSON.stringify(Messageisrejected, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(Messageisrejected);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Message is rejected");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 11 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 12 ----------------
    test(`Testcase 12: NAMABANK - SendingList -  SmsId is duplicated ${MediumPriority.name} có smsType = (${smsType2Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const duplicatedSmsId = "SmsId_020";

        const SmsIdIsDuplicated = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": duplicatedSmsId,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": duplicatedSmsId,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 12: NAMABANK - SendingList -  SmsId is duplicated ${MediumPriority.name} có smsType = (${smsType2Value}): ${JSON.stringify(SmsIdIsDuplicated, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(SmsIdIsDuplicated);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SmsId is duplicated");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
                { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
            console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 12 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 13 ----------------
    test(`Testcase 13: NAMABANK - SendingList -  Message is duplicated ${MediumPriority.name} có smsType = (${smsType2Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const duplicatedMessage = "Message gửi bị duplicate";

        const MessageIsDuplicated = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": duplicatedMessage,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": duplicatedMessage,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                }
            ]
        }

        console.log(`🚀  Testcase 13: NAMABANK - SendingList -  Message is duplicated ${MediumPriority.name} có smsType = (${smsType2Value}): ${JSON.stringify(MessageIsDuplicated, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(MessageIsDuplicated);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(400);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("Message is duplicated");
        expect(Data).toBe(false);

        if (Code === 201) {
            const [
                { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
                { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 }
            ] = ResultList;

            console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
            console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });

        } else {
            const [] = ResultList;
        }

        console.log("✅ Testcase 13 passed — Response hợp lệ! — Code: 400");
        console.log("\n" + "=".repeat(100) + "\n");
    });

});

test.describe('NAMABANK - SendingList - HAPPY CASE', { tag: ['@namabank', '@happy'] }, () => {

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


    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    const highPriority = priority.find(p => p.name === "Cao")!;
    const lowPriority = priority.find(p => p.name === "Thấp")!;
    const smsType1Value = SmsType.find(s => s.name === "Tin OTP")!.value;
    const smsType2Value = SmsType.find(s => s.name === "Tin biến động")!.value;
    const smsType3Value = SmsType.find(s => s.name === "Tin khác")!.value;

    // ---------------- TESTCASE 02 ----------------
    test(`Testcase 02: NAMABANK - SendingList -  Thành công ưu tiên ${MediumPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const { smsId: smsId3, content: content3 } = generateRandomData();

        const successSmsType2 = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": MediumPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType3Value.toString()
                },
                {
                    "SmsId": smsId3,
                    "PhoneNumber": phoneNumber,
                    "Content": content3,
                    "ContentType": contentType,
                    "SmsType": smsType1Value.toString()
                }

            ]
        }

        console.log(`🚀  Testcase 02: NAMABANK - SendingList -  Thành công ưu tiên ${MediumPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value}): ${JSON.stringify(successSmsType2, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(successSmsType2);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(201);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("201");
        expect(Message).toBe("Success");
        expect(Data).toBe(true);

        const [
            { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
            { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 },
            { Telco: Telco3, SmsId: SmsId3, IsMnp: IsMnp3 }
        ] = ResultList;

        console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
        console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });
        console.log("📩 Result 3:", { Telco3, SmsId3, IsMnp3 });
        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 201");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    test(`Testcase 02 -1: NAMABANK - SendingList -  Thành công ưu tiên ${highPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const { smsId: smsId3, content: content3 } = generateRandomData();

        const successSmsType2 = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": highPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType3Value.toString()
                },
                {
                    "SmsId": smsId3,
                    "PhoneNumber": phoneNumber,
                    "Content": content3,
                    "ContentType": contentType,
                    "SmsType": smsType1Value.toString()
                }

            ]
        }

        console.log(`🚀  Testcase 02: NAMABANK - SendingList -  Thành công ưu tiên ${highPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value}): ${JSON.stringify(successSmsType2, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(successSmsType2);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(201);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("201");
        expect(Message).toBe("Success");
        expect(Data).toBe(true);

        const [
            { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
            { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 },
            { Telco: Telco3, SmsId: SmsId3, IsMnp: IsMnp3 }
        ] = ResultList;

        console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
        console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });
        console.log("📩 Result 3:", { Telco3, SmsId3, IsMnp3 });
        console.log("✅ Testcase 02 -1 passed — Response hợp lệ! — Code: 201");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    test(`Testcase 02 -1: NAMABANK - SendingList -  Thành công ưu tiên ${lowPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value})`, async ({ namABankSendingListAPI, generateRandomData }) => {

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const { smsId: smsId3, content: content3 } = generateRandomData();

        const successSmsType2 = {
            "IsCheckDuplicate": isCheckDuplicate,
            "Priority": lowPriority.value.toString(),
            "Brandname": brandname,
            "SendingList": [
                {
                    "SmsId": smsId1,
                    "PhoneNumber": phoneNumber,
                    "Content": content1,
                    "ContentType": contentType,
                    "SmsType": smsType2Value.toString()
                },
                {
                    "SmsId": smsId2,
                    "PhoneNumber": phoneNumber,
                    "Content": content2,
                    "ContentType": contentType,
                    "SmsType": smsType3Value.toString()
                },
                {
                    "SmsId": smsId3,
                    "PhoneNumber": phoneNumber,
                    "Content": content3,
                    "ContentType": contentType,
                    "SmsType": smsType1Value.toString()
                }

            ]
        }

        console.log(`🚀  Testcase 02 -2: NAMABANK - SendingList -  Thành công ưu tiên ${lowPriority.name} có smsType = (${smsType1Value},${smsType2Value} & ${smsType3Value}): ${JSON.stringify(successSmsType2, null, 2)}`);

        const response = await namABankSendingListAPI.NamABankMultiSendingList(successSmsType2);

        console.log("👉 Status thực tế:", response.status());
        expect(response.status()).toBe(201);

        const body = await response.json();
        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("201");
        expect(Message).toBe("Success");
        expect(Data).toBe(true);

        const [
            { Telco: Telco1, SmsId: SmsId1, IsMnp: IsMnp1 },
            { Telco: Telco2, SmsId: SmsId2, IsMnp: IsMnp2 },
            { Telco: Telco3, SmsId: SmsId3, IsMnp: IsMnp3 }
        ] = ResultList;

        console.log("📩 Result 1:", { Telco1, SmsId1, IsMnp1 });
        console.log("📩 Result 2:", { Telco2, SmsId2, IsMnp2 });
        console.log("📩 Result 3:", { Telco3, SmsId3, IsMnp3 });
        console.log("✅ Testcase 02 -2 passed — Response hợp lệ! — Code: 201");
        console.log("\n" + "=".repeat(100) + "\n");
    });

});

