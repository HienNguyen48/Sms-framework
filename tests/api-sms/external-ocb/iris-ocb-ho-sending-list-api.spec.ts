import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

const username: string = 'iris';
const password: string = 'iris@123';


test.describe('OCB - Sending list - HAPPY CASE', { tag: ['@ocbsendinglist', '@happy'] }, () => {

    const ServiceID: string = 'OCB';
    const PhoneNumber: string = "84374619213";
    const telco: string = "";

    test(`Testcase 02: OCB - SendingList - Success (Thành công)`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {

        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();

        const sms1 = {
            "Message": content1,
            "PhoneNumber": PhoneNumber,
            "Telco": telco,
            "SMS_ID": smsId1,
            "ServiceID": "OCB"
        };

        const sms2 = {
            "Message": content2,
            "PhoneNumber": PhoneNumber,
            "Telco": telco,
            "SMS_ID": smsId2,
            "ServiceID": "OCB"
        };

        const SendingList = [sms1, sms2];

        const phoneNumberIsInvalid = {
            "UserId": username,
            "Password": password,
            SendingList
        };

        console.log("🚀  Testcase 02: B2B 2023 - SendingList - Success (Thành công)");
        console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
        console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);

        // Gửi n request
        const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(200);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        // const { ResultCode, ResultMessage } = body;

        for (const result of body.ResultList) {
            console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);

            expect(result.ResultCode).toBe("0");
            expect(result.ResultMessage).toBe("");

        }

        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 0");

    });
});

test.describe('OCB - Sending list - UNHAPPY CASE', { tag: ['@ocbsendinglist', '@unhappy'] }, () => {

    const ServiceID: string = 'OCB';
    const PhoneNumber: string = "84374619213";
    const telco: string = "";

    test(`Testcase 01: OCB - SendingList - PhoneNumber Is Invalid`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {
        const username = envEnvironmentVariables.get("USERNAME");
        const password = envEnvironmentVariables.get("PASSWORD");
        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);

        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const { smsId: smsId3, content: content3 } = generateRandomData();
        const phoneNumberIsInvalid1 = "849048989998888888888";
        const phoneNumberIsInvalid2 = "374619213";

        const sms1 = {
            "Message": content1,
            "PhoneNumber": phoneNumberIsInvalid1,
            "Telco": telco,
            "SMS_ID": smsId1,
            "ServiceID": "OCB"
        };

        const sms2 = {
            "Message": content2,
            "PhoneNumber": phoneNumberIsInvalid2,
            "Telco": telco,
            "SMS_ID": smsId2,
            "ServiceID": "OCB"
        };

        const sms3 = {
            "Message": content3,
            "PhoneNumber": "",
            "Telco": telco,
            "SMS_ID": smsId3,
            "ServiceID": "OCB"
        };


        const SendingList = [sms1, sms2, sms3];

        const phoneNumberIsInvalid = {
            "UserId": username,
            "Password": password,
            SendingList
        };

        console.log("🚀  Testcase 01: OCB - SendingList - PhoneNumber Is Invalid");
        console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
        console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);
        console.log(` => SMS 3 : Brandname = ${phoneNumberIsInvalid.SendingList[2].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[2].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[2].PhoneNumber}`);

        // Gửi n request
        const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(200);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        // const { ResultCode, ResultMessage } = body;

        for (const result of body.ResultList) {
            console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);
            expect(result.ResultCode).toBe("1");
            expect(result.ResultMessage).toBe("PhoneNumber invalid");

        }
        console.log("✅ Testcase 01 passed — Response hợp lệ! — Code: 1");
    });

    test(`Testcase 03: OCB - SendingList - Dupplicate Message & SmsId is duplicated(Tin nhắn bị lặp & Tin nhắn bị lặp SMS_ID)`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {

        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);

        for (let i = 0; i <= 2; i++) {
            const { smsId: smsId1, content: content1 } = generateRandomData();
            const { smsId: smsId2, content: content2 } = generateRandomData();
            let duplicateSmsId = "smsId_01";
            let duplicateMessage = "message_01";

            const sms1 = {
                "Message": content1,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": duplicateSmsId,
                "ServiceID": "OCB"
            };

            const sms2 = {
                "Message": duplicateMessage,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId2,
                "ServiceID": "OCB"
            };

            const SendingList = [sms1, sms2];

            const phoneNumberIsInvalid = {
                "UserId": username,
                "Password": password,
                SendingList
            };

            console.log("🚀  Testcase 03: B2B 2023 - SendingList - Dupplicate Message & SmsId is duplicated(Tin nhắn bị lặp & Tin nhắn bị lặp SMS_ID)");
            console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
            console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);

            // Gửi n request
            const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
            console.log("👉 Status thực tế:", responses.status());
            expect(responses.status()).toBe(200);

            const body = await responses.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));

            // const { ResultCode, ResultMessage } = body;

            for (const result of body.ResultList) {
                console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);

                if (result.SMS_ID === "smsId_01") {
                    expect(result.ResultCode).toBe("2");
                    expect(result.ResultMessage).toBe("Dupplicate Message");
                } else if (result.Message === "message_01") {
                    expect(result.ResultCode).toBe("23");
                    expect(result.ResultMessage).toBe("SmsId is duplicated");
                } else {
                    (`Không xác định: ResultCode = ${result.ResultCode} `)
                }

            }
            console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 2 & Code: 23");
        }

    });

    test(`Testcase 04: OCB - SendingList - UserId or password invalid(Tài khoản/ Mật khẩu không đúng)`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {

        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);

        for (let i = 0; i <= 1; i++) {
            const { smsId: smsId1, content: content1 } = generateRandomData();
            const { smsId: smsId2, content: content2 } = generateRandomData();
            let usernameIsInvalid = "username_01";
            let passwordIsInvalid = "password_01";

            const sms1 = {
                "Message": content1,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId1,
                "ServiceID": "OCB"
            };

            const sms2 = {
                "Message": content2,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId2,
                "ServiceID": "OCB"
            };

            const SendingList = [sms1, sms2];

            const phoneNumberIsInvalid = {
                "UserId": usernameIsInvalid,
                "Password": passwordIsInvalid,
                SendingList
            };

            console.log("🚀  Testcase 04: B2B 2023 - SendingList - UserId or password invalid(Tài khoản/ Mật khẩu không đúng)");
            console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
            console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);

            // Gửi n request
            const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
            console.log("👉 Status thực tế:", responses.status());
            expect(responses.status()).toBe(200);

            const body = await responses.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));

            // const { ResultCode, ResultMessage } = body;

            for (const result of body.ResultList) {
                console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);

                if (result.UserId === "username_01" && result.Password === "password_01") {
                    expect(result.ResultCode).toBe("3");
                    expect(result.ResultMessage).toBe("UserId or password invalid");
                } else {
                    (`Không xác định: ResultCode = ${result.ResultCode} `)
                }

            }
            console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 3");
        }

    });

    test(`Testcase 05: OCB - SendingList - ServiceID invalid & Message is rejected (Nội Brandname không hợp lệ & Nội dung tin có từ khóa bị chặn)`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {
        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);

        //Nội dung có chứa từ khóa bị chặn 
        const { content } = generateRandomData();
        const insertPos = Math.floor(Math.random() * content.length);
        const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);

        for (let i = 0; i < 1; i++) {
            const { smsId: smsId1, content: content1 } = generateRandomData();
            const { smsId: smsId2, content: content2 } = generateRandomData();
            let serviceIdIsInvalid = "OCBB";

            const sms1 = {
                "Message": content1,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId1,
                "ServiceID": serviceIdIsInvalid
            };

            const sms2 = {
                "Message": contentWithQC,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId2,
                "ServiceID": "OCB"
            };

            const SendingList = [sms1, sms2];

            const phoneNumberIsInvalid = {
                "UserId": username,
                "Password": password,
                SendingList
            };

            console.log("🚀  Testcase 05: B2B 2023 - SendingList - ServiceID invalid & Message is rejected (Nội Brandname không hợp lệ & Nội dung tin có từ khóa bị chặn)");
            console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
            console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);

            // Gửi n request
            const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
            console.log("👉 Status thực tế:", responses.status());
            expect(responses.status()).toBe(200);

            const body = await responses.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));

            // const { ResultCode, ResultMessage } = body;
            for (const result of body.ResultList) {
                console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);

                if (result.ServiceID === "OCBB") {
                    expect(result.ResultCode).toBe("5");
                    expect(result.ResultMessage).toBe("ServiceID invalid");
                }

                if (result.Message === contentWithQC) {
                    expect(result.ResultCode).toBe("4");
                    expect(result.ResultMessage).toBe("Message is rejected");
                }

            }
            console.log("✅ Testcase 05 passed — Response hợp lệ! — Code: 5 & Code: 4");
        }

    });

    test(`Testcase 06: OCB - SendingList - SMS_ID invalid & Message length invalid (SMS_ID vượt quá độ dài quy định & Định dạng, độ dài nội dung tin không hợp lệ)`, async ({ sendOCBHOSendingListAPI, generateRandomData, envEnvironmentVariables }) => {

        // const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);
        let messageIsInvalid = generateRandomData().content + "A".repeat(1001);
        //Nội dung có chứa từ khóa bị chặn 
        const { content } = generateRandomData();
        const insertPos = Math.floor(Math.random() * content.length);
        const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);

        for (let i = 0; i < 1; i++) {
            const { smsId: smsId1, content: content1 } = generateRandomData();
            const { smsId: smsId2, content: content2 } = generateRandomData();
            let smsIdIsInvalid = "";

            const sms1 = {
                "Message": content1,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsIdIsInvalid,
                "ServiceID": ServiceID
            };

            const sms2 = {
                "Message": messageIsInvalid,
                "PhoneNumber": PhoneNumber,
                "Telco": telco,
                "SMS_ID": smsId2,
                "ServiceID": ServiceID
            };

            const SendingList = [sms1, sms2];

            const phoneNumberIsInvalid = {
                "UserId": username,
                "Password": password,
                SendingList
            };

            console.log("🚀 Testcase 06: B2B 2023 - SendingList - SMS_ID invalid & Message length invalid (SMS_ID vượt quá độ dài quy định & Định dạng, độ dài nội dung tin không hợp lệ");
            console.log(` => SMS 1 : Brandname = ${phoneNumberIsInvalid.SendingList[0].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[0].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[0].PhoneNumber}`);
            console.log(` => SMS 2 : Brandname = ${phoneNumberIsInvalid.SendingList[1].ServiceID}, SmsId = ${phoneNumberIsInvalid.SendingList[1].SMS_ID}, Content = ${phoneNumberIsInvalid.SendingList[1].PhoneNumber}`);

            // Gửi n request
            const responses = await sendOCBHOSendingListAPI.SendOCBHOSendingList(phoneNumberIsInvalid.UserId, phoneNumberIsInvalid.Password, phoneNumberIsInvalid.SendingList);
            console.log("👉 Status thực tế:", responses.status());
            expect(responses.status()).toBe(200);

            const body = await responses.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));

            // const { ResultCode, ResultMessage } = body;
            for (const result of body.ResultList) {
                console.log(`📩 Response SMS ${result.SmsID}: ResultCode = ${result.ResultCode}, ResultMessage = ${result.ResultMessage}`);

                if (result.SMS_ID === "") {
                    expect(result.ResultCode).toBe("5");
                    expect(result.ResultMessage).toBe("SMS_ID invalid");
                }

                if (result.Message === messageIsInvalid) {
                    expect(result.ResultCode).toBe("4");
                    expect(result.ResultMessage).toBe("Message length invalid");
                }

            }
            console.log("✅ Testcase 06 passed — Response hợp lệ! — Code: 5 & Code: 4");
        }

    });
});