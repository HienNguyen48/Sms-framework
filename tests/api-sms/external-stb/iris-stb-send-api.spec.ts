import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture"

let access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjAwODc3MjksImV4cCI6MTc2MDA4OTUyOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.PWDH4uWVV4Yfr5NlLE-t_-E_4sDXAMDwm3FIHW4ompk';
const grant_type: string = 'password';
const username: string = 'iris';
const password: string = 'iris@123';
const serviceID: string = 'Sacombank';
const contentType: string = '30';
const phoneNumber: string = "84931113128";
const userId: string = "sms_stb";
const passWord: string = "123456";
const telco: string = "";
const phoneNumberIsInvalid = "849048989998888888888";
const usernameIsInvalid: string = "";
const passwordIsInvalid: string = "iris@12333333";
const serviceIDInvalid = "";


const priority = [
    { "name": "Cao", "value": 10 },
    { "name": "Trung Bình", "value": 5 },
    { "name": "Thấp", "value": 1 }
]

test.describe('STB - SendingList - HAPPY CASE', { tag: ['@stb', '@happy'] }, () => {

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

    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    const highPriority = priority.find(p => p.name === "Cao")!;
    const lowPriority = priority.find(p => p.name === "Thấp")!;

    // ---------------- TESTCASE 02 ----------------
    test(`Testcase 02: STB Send - Thành công ${MediumPriority.name}`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 02: Mã 0 - Thành công ${MediumPriority.name} => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[1].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(0);
                expect(Message).toBe("Success");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    test(`Testcase 02 - 1: STB Send - Thành công ${highPriority.name}`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 02: Mã 0 - Thành công ${highPriority.name} => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[1].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(0);
                expect(Message).toBe("Success");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    test(`Testcase 02 - 1: STB Send - Thành công ${lowPriority.name}`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 02: Mã 0 - Thành công ${lowPriority.name} => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[1].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(0);
                expect(Message).toBe("Success");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

});

test.describe('STB - SendingList - UNHAPPY CASE', { tag: ['@b2b2018', '@unhappy'] }, () => {

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

    const highPriority = priority.find(p => p.name === "Cao")!;
    // ---------------- TESTCASE 01 ----------------
    test(`Testcase 01: STB Send - PhoneNumber invalid`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 01: Mã lỗi 1 - PhoneNumber Is Invalid => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumberIsInvalid,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(1);
                expect(Message).toBe("PhoneNumber invalid");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 01 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 03 ----------------
    test(`Testcase 03: STB Send - Tài khoản/ Mật khẩu không đúng`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 03: Mã lỗi 3 - Tài khoản/ Mật khẩu không đúng => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    usernameIsInvalid,
                    passwordIsInvalid,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(3);
                expect(Message).toBe("UserId or password invalid");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 04 ----------------
    test(`Testcase 04: STB Send -  Tin nhắn bị lặp`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            const duplicateMessage = "Với bộ lông trắng muốt của mình1";
            console.log(`🟢 Testcase 04: Testcase 03: STB Send -  Tin nhắn bị lặp => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(0);
                expect(Message).toBe("Success");//khi nào chặn check trùng thì thay sau 
                // expect(ErrorCode).toBe(2);
                // expect(Message).toBe("Dupplicate Message");//khi nào chặn check trùng thì thay sau 

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 04 ----------------
    test(`Testcase 05: STB Send -  Độ dài tin nhắn không hợp lệ`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            const messageInvalid = "Với bộ lông trắng muốt của mình, mỗi lần chú vút lên bầu trời bay lượn thì thật là nổi bật. Những sợi lông trắng tinh, cứng cáp như những chiếc chổi nhỏ, xếp đều lên thân mình và đôi cánh của chú. Lớp lông ấy còn không thấm nước và óng mượt vô cùng. Đôi cánh của Bạch Tuyết trông nhỏ nhắn là thế nhưng lúc xòe ra lại to rộng vô cùng. Cái đầu của Bạch Tuyết rất nhỏ nhưng lại rất linh hoạt, luôn xoay qua xoay lại giúp chú có thể nhìn được ở mọi hướng. hai con mắt như hai hạt đỗ đen lóng lánh, lung linh dưới ánh nắng mặt trời.Với bộ lông trắng muốt của mình, mỗi lần chú vút lên bầu trời bay lượn thì thật là nổi bật. Những sợi lông trắng tinh, cứng cáp như những chiếc chổi nhỏ, xếp đều lên thân mình và đôi cánh của chú. Lớp lông ấy còn không thấm nước và óng mượt vô cùng. Đôi cánh của Bạch Tuyết trông nhỏ nhắn là thế nhưng lúc xòe ra lại to rộng vô cùng. Cái đầu của Bạch Tuyết rất nhỏ nhưng lại rất linh hoạt, luôn xoay qua xoay lại giúp chú có thể nhìn được ở mọi hướng. hai con mắt như hai h";
            console.log(`🟢 Testcase 05: STB Send -  Độ dài tin nhắn không hợp lệ (>612) => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    messageInvalid,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(4);
                expect(Message).toBe("Message length invalid");//khi nào chặn check trùng thì thay sau 

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 05 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 06 ----------------
    test(`Testcase 06: STB Send -  SMS_ID invalid`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            const smsIdInvalid = "";
            console.log(`🟢 Testcase 06: STB Send -  SMS_ID invalid => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsIdInvalid,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(5);
                expect(Message).toBe("SMS_ID invalid");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 06 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 07 ----------------
    test(`Testcase 07: STB Send -  ServiceID invalid`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 07: STB Send -  ServiceID invalid => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceIDInvalid,
                    smsId,
                    phoneNumber,
                    message,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(5);
                expect(Message).toBe("ServiceID invalid");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 07 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 08 ----------------
    test(`Testcase 08: STB Send -  Message is rejected`, async ({ sendSTBSendingAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        for (let i = 1; i <= 1; i++) {
            const { smsId, message } = generateRandomData();
            console.log(`🟢 Testcase 08: STB Send -  Message is rejected => Gửi tin lần ${i} có: \n 👉 serviceId: ${serviceID},\n 👉 ${smsId},\n 👉 message: ${message},\n 👉 userId: ${userId}, \n 👉 password: ${passWord}`);

            const insertPos = Math.floor(Math.random() * message.length);
            const contentWithQC = message.slice(0, insertPos) + "<QC>" + message.slice(insertPos);

            try {
                const responses = await sendSTBSendingAPI.STBSending(
                    serviceID,
                    smsId,
                    phoneNumber,
                    contentWithQC,
                    contentType,
                    userId,
                    passWord,
                    priority[0].value.toString(),
                    telco
                );

                console.log("👉 Status thực tế:", responses.status());
                expect(responses.status()).toBe(200);

                const body = await responses.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));

                const { ErrorCode, Message, Telco, PhoneNumber, CustomerId } = body;

                console.log("📩 Response:", { ErrorCode, Message, Telco, PhoneNumber, CustomerId });
                expect(ErrorCode).toBe(4);
                expect(Message).toBe("Message is rejected");

            } catch (error) {
                console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, message: ${message}, serviceId: ${serviceID}`);
                throw error;
            }
        }
        console.log("✅ Testcase 08 passed — Response hợp lệ! — Code: 200");
        console.log("\n" + "=".repeat(100) + "\n");
    });
});
