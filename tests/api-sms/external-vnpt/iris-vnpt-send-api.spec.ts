import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture"

let access_token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjMwMjYyMzUsImV4cCI6MTc2MzAyODAzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.wfm3r7Zfoyr7MrVbkslKPGJ1_iFHmJjullsgnGRS9kY";
const username: string = "test.vnpt";
const password: string = "123456";
const brandname: string = 'IRIS';
const contractType: string = "1";
const sendTime: string = "";
const msisdnList: string[] = ["0904526363", "0912345678", "0987654321", "0909876543"];
const msisdnListInvalid: string[] = ["904526363", "912345678", "987654321", "909876543"];
const isUnicode: string = "0";
const isUnicode1: string = "1";
const encrypted: string = "1";
const usernameInvalid: string = "";
const passWordInvalid: string = "";
const sendTimeInvalid: string = "17:-00";
const brandnameInvalid: string = "";
const contractTypeInvalid: string = "3";

test.describe('VNPT - Send - UNHAPPY CASE', { tag: ['@vnpt', '@unhappy'] }, () => {

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
    });

    // ---------------- TESTCASE 02 ----------------
    test(`Testcase 01: VNPT Send - Username không hợp lệ`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 01: Mã lỗi 1 - Username không hợp lệ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    usernameInvalid,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(1);
                expect(error_desc).toBe("Username, password không hợp lệ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 03 ----------------
    test(`Testcase 03: VNPT Send - password không hợp lệ`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 03: STB Send - password không hợp lệ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    passWordInvalid,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(1);
                expect(error_desc).toBe("Username, password không hợp lệ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 04 ----------------
    test(`Testcase 04: VNPT Send - Thời gian đặt lịch sai định dạng`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 04: STB Send - Thời gian đặt lịch sai định dạng => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTimeInvalid,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(3);
                expect(error_desc).toBe("Thời gian đặt lịch sai định dạng");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 05 ----------------
    test(`Testcase 05: VNPT Send - Brandname không hợp lệ`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 05: STB Send - Brandname không hợp lệ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandnameInvalid,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(4);
                expect(error_desc).toBe("Brandname không hợp lệ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 05 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 06 ----------------
    test(`Testcase 06: VNPT Send -  Contract_type_id không hợp lệ CSKH =1 hoặc QC = 2`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 06: STB Send -  Contract_type_id không hợp lệ CSKH =1 hoặc QC = 2 => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractTypeInvalid,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(5);
                expect(error_desc).toBe("Contract_type_id không hợp lệ, CSKH=1 hoặc QC=2");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 06 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 07 ----------------
    test(`Testcase 07: VNPT Send -  Độ dài tin nhắn không hợp lệ`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            let longContent = generateRandomData().content + "A".repeat(10001);
            console.log(`🟢 Testcase 07: STB Send -  Độ dài tin nhắn không hợp lệ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    longContent,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(6);
                expect(error_desc).toBe("Độ dài tin nhắn không hợp lệ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 07 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 08 ----------------
    test(`Testcase 08: VNPT Send -  Định dạng ký tự không hợp lệ hoặc không hỗ trợ`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message, messageInvalid } = generateRandomData();
            const msisdn = msisdnList[i];

            console.log(`🟢 Testcase 08: STB Send -  Định dạng ký tự không hợp lệ hoặc không hỗ trợ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    messageInvalid,
                    sendTime,
                    msisdn,
                    isUnicode1,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(7);
                expect(error_desc).toBe("Định dạng ký tự không hợp lệ hoặc không hỗ trợ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 08 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 09 ----------------
    test(`Testcase 09: VNPT Send -  Danh sách số điện thoại không hợp lệ`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i < msisdnListInvalid.length; i++) {
            const msisdn1 = msisdnListInvalid[i];
            const { smsId, message } = generateRandomData()

            console.log(`🟢 Testcase 09: STB Send -  Danh sách số điện thoại không hợp lệ => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn1}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdn1,
                    isUnicode1,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(8);
                expect(error_desc).toBe("Danh sách số điện thoại không hợp lệ");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 09 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 10 ----------------
    test(`Testcase 10: VNPT Send -  Lỗi request ID khách hàng lặp ( spam)`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i < msisdnList.length; i++) {
            const msisdn = msisdnList[i];
            const { smsId, message } = generateRandomData()
            const smsIdInvalid = "VNPT01"

            console.log(`🟢 Testcase 10: VNPT Send -  Lỗi request ID khách hàng lặp (spam) => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsIdInvalid,
                    username,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(9);
                expect(error_desc).toBe("Lỗi request ID khách hàng lặp (spam)");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 10 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 11 ----------------
    test(`Testcase 11: VNPT Send -  Nội dung chưa key quảng cáo`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i < msisdnList.length; i++) {
            const msisdn = msisdnList[i];
            const { smsId, message } = generateRandomData()
            const insertPos = Math.floor(Math.random() * message.length);
            const contentWithQC = message.slice(0, insertPos) + "<QC>" + message.slice(insertPos);

            console.log(`🟢 Testcase 11: VNPT Send -  Nội dung chưa key quảng cáo => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    contentWithQC,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(10);
                expect(error_desc).toBe("Nội dung chưa key quảng cáo");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 11 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 12 ----------------
    test(`Testcase 12: Nội dung chứa ký tự unicode`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i < msisdnList.length; i++) {
            const msisdn = msisdnList[i];
            const { smsId, message, contentUnicode } = generateRandomData()

            console.log(`🟢 Testcase 12: Nội dung chứa ký tự unicode => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    contentUnicode,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(11);
                expect(error_desc).toBe("Nội dung chứa ký tự unicode");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 12 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 13 ----------------
    test(`Testcase 13: Brandname không được đăng ký mạng này`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i < msisdnList.length; i++) {
            const msisdn = msisdnList[i];
            const { smsId, message, brandnameIsInvali } = generateRandomData()

            console.log(`🟢 Testcase 13: Brandname không được đăng ký mạng này => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandnameIsInvali,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(12);
                expect(error_desc).toBe("Brandname không được đăng ký mạng này");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 13 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 14 ----------------
    test(`Testcase 14: Lỗi do SmsId trùng lặp trong vòng 24h`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i <= 2; i++) {
            const msisdnListOne = "01699362141";
            const { smsId, message } = generateRandomData()
            const duplicateMessage = "test tin phuc vu di kenh backup hni-shb 533";

            console.log(`🟢 Testcase 14: Lỗi do SmsId trùng lặp trong vòng 24h => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdnListOne}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    duplicateMessage,
                    sendTime,
                    msisdnListOne,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(14);
                expect(error_desc).toBe("Lỗi do SMS bị trùng lặp (cùng 1 nội dung gửi từ cùng 1 Brandname tới cùng 1 thuê bao trong khoảng thời gian ngắn)");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 14 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 15 ----------------
    test(`Testcase 15: Lỗi nội tại hệ thống của CP`, async ({ vnptSendingAPI, generateRandomData }) => {
        for (let i = 0; i <= 1; i++) {
            const msisdnListOne = "01699362141";
            const { smsId, message } = generateRandomData()

            console.log(`🟢 Testcase 15: Lỗi nội tại hệ thống của CP => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdnListOne}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdnListOne,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(-1);
                expect(error_desc).toBe("Lỗi nội tại hệ thống của CP");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 15 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });
});

test.describe('VNPT - Send - HAPPY CASE', { tag: ['@vnpt', '@happy'] }, () => {

    test.beforeEach('Testcase 16: Get token', async ({ loginAPI }) => {

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
    });

    // ---------------- TESTCASE 16 ----------------
    test(`Testcase 16: VNPT Send - Thành công`, async ({ vnptSendingAPI, generateRandomData }) => {

        for (let i = 0; i < msisdnList.length; i++) {
            const { smsId, message } = generateRandomData();
            const msisdn = msisdnList[i];
            console.log(`🟢 Testcase 16: VNPT Send - Thành công => Gửi tin lần ${i} có: \n 👉 requestId: ${smsId},\n 👉 username: ${username},\n 👉 message: ${message}, \n 👉 msisdnList: ${msisdn}`);

            try {
                const responses = await vnptSendingAPI.VNPTSending(
                    smsId,
                    username,
                    password,
                    brandname,
                    contractType,
                    message,
                    sendTime,
                    msisdn,
                    isUnicode,
                    encrypted
                );

                console.log("\n 👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { requestId, error_code, error_desc } = body;

                console.log("📩 Response:", { requestId, error_code, error_desc });
                expect(error_code).toBe(0);
                expect(error_desc).toBe("Thành công");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: `);
                throw error;
            }
        }
        console.log("✅ Testcase 16 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });
});
