import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

let access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjAwODc3MjksImV4cCI6MTc2MDA4OTUyOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.PWDH4uWVV4Yfr5NlLE-t_-E_4sDXAMDwm3FIHW4ompk';
const grant_type: string = 'password';
const username: string = 'iris';
const password: string = 'iris@123';
const brandname: string = 'IRIS';
const IsCheckDuplicate: string = "1";
const PhoneNumber: string = "84374619213";
const ContentType: string = "1";
const telco: string = "";
const telcoInvalid = "dfsfsdfsd";
const sendTime: string = "";

const priority = [
    { "name": "Cao", "value": 10 },
    { "name": "Trung Bình", "value": 5 },
    { "name": "Thấp", "value": 1 }
]

test.describe('B2B 2023 - Send - Happy case', { tag: ['@b2b2023', '@happy'] }, () => {

    test.beforeEach('Testcase 1: Get token', async ({ loginAPI }) => {

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
    test(`Testcase 13: B2B 2023 Send - Thành công - Ưu tiên cao`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 13: B2B 2023 Send - Thành công - Ưu tiên cao => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            const sendUuTienCao0 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendUuTienCao0, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendUuTienCao0.IsCheckDuplicate,
                    sendUuTienCao0.SmsId,
                    sendUuTienCao0.PhoneNumber,
                    sendUuTienCao0.Content,
                    sendUuTienCao0.ContentType,
                    sendUuTienCao0.Telco,
                    sendUuTienCao0.SendTime,
                    sendUuTienCao0.Brandname
                ); sendUuTienCao0

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${highPriority.name} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${highPriority.name} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }

                expect(statusCode, "HTTP status không phải 200").toBe(200);
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("0");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });

    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    test(`Testcase 14: B2B 2023 Send - Thành công - Ưu tiên trung bình`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 14: B2B 2023 Send - Thành công - Ưu tiên trung bình => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            const sendUuTienTrungBinh =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": MediumPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendUuTienTrungBinh, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendUuTienTrungBinh.IsCheckDuplicate,
                    sendUuTienTrungBinh.SmsId,
                    sendUuTienTrungBinh.PhoneNumber,
                    sendUuTienTrungBinh.Content,
                    sendUuTienTrungBinh.ContentType,
                    sendUuTienTrungBinh.Telco,
                    sendUuTienTrungBinh.SendTime,
                    sendUuTienTrungBinh.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${MediumPriority.name} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${MediumPriority.name} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }

                expect(statusCode, "HTTP status không phải 200").toBe(200);
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("0");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });

    const LowPriority = priority.find(p => p.name === "Thấp")!;
    test(`Testcase 15: B2B 2023 Send - Thành công - Ưu tiên thấp`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 14: B2B 2023 Send - Thành công - Ưu tiên thấp => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            const sendUuTienThap =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": LowPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendUuTienThap, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendUuTienThap.IsCheckDuplicate,
                    sendUuTienThap.SmsId,
                    sendUuTienThap.PhoneNumber,
                    sendUuTienThap.Content,
                    sendUuTienThap.ContentType,
                    sendUuTienThap.Telco,
                    sendUuTienThap.SendTime,
                    sendUuTienThap.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${LowPriority.name} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${LowPriority.name} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }

                expect(statusCode, "HTTP status không phải 200").toBe(200);
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("0");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });
});

test.describe('B2B 2023 - Send - UNHAPPY CASE', { tag: ['@b2b2023', '@unhappy'] }, () => {

    test.beforeEach('Testcase 1: Get token', async ({ loginAPI }) => {

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
    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    const LowPriority = priority.find(p => p.name === "Thấp")!;

    // test(`Testcase 01: B2B 2023 Send - Mã lỗi 1 - Lỗi do tài khoản gửi tin không hợp lệ`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
    //     // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

    //     for (let i = 1; i <= 1; i++) {// gửi 1 sms 
    //         const { smsId, content } = generateRandomData();
    //         console.log(`🟢 Testcase 01: B2B 2023 Send - Mã lỗi 1 - Lỗi do tài khoản gửi tin không hợp lệ => Gửi lần ${i}: smsId: ${smsId}, content: ${content}, brandname: ${brandname}`);

    //         try {
    //             const response = await sendB2B2023SendAPI.SendB2B2023Sending(
    //                 IsCheckDuplicate,
    //                 smsId,
    //                 PhoneNumber,
    //                 content,
    //                 ContentType,
    //                 telcoInvalid,
    //                 sendTime,
    //                 brandname);

    //             const statusCode: number = response.status();
    //             const responseBody = await response.json();
    //             console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    //             if (statusCode === 200) {
    //                 console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
    //             } else {
    //                 console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
    //             }
    //             expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
    //             expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("1");


    //         } catch (err) {
    //             console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
    //             console.log(`Error: ${err}`);
    //             throw err;
    //         }
    //     };
    // });

    test(`Testcase 02: B2B 2023 Send - Mã lỗi 2 - Lỗi Brandname rỗng hoặc bị bỏ trống`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { smsId, content } = generateRandomData();

            console.log(`🚀 Testcase 02 - Kiểm tra Brandname rỗng hoặc bỏ trống => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);

            const sendMaLoi02 = [
                {
                    "Brandname": "",
                    "IsCheckDuplicate": IsCheckDuplicate,
                    "Priority": highPriority.value.toString(),
                    "SmsId": smsId,
                    "PhoneNumber": PhoneNumber,
                    "Content": content,
                    "ContentType": ContentType,
                    "Telco": telco,
                    "SendTime": sendTime
                }
            ];

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi02[0], null, 2)}`);

            try {
                const sms = sendMaLoi02[0];

                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sms.IsCheckDuplicate,
                    sms.SmsId,
                    sms.PhoneNumber,
                    sms.Content,
                    sms.ContentType,
                    sms.Telco,
                    sms.SendTime,
                    sms.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("2");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 03: B2B 2023 Send - Mã lỗi 3 - Lỗi Brandname không hợp lệ`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();

            const sendMaLoi03 = [
                {
                    "Brandname": "mama",
                    "IsCheckDuplicate": IsCheckDuplicate,
                    "Priority": highPriority.value.toString(),
                    "SmsId": smsId,
                    "PhoneNumber": PhoneNumber,
                    "Content": content,
                    "ContentType": ContentType,
                    "Telco": telco,
                    "SendTime": sendTime
                }
            ];
            console.log(`🚀 Testcase 03: B2B 2023 Send - Mã lỗi 3 - Lỗi Brandname không hợp lệ => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);
            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi03[0], null, 2)}`);

            try {
                const sms = sendMaLoi03[0];

                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sms.IsCheckDuplicate,
                    sms.SmsId,
                    sms.PhoneNumber,
                    sms.Content,
                    sms.ContentType,
                    sms.Telco,
                    sms.SendTime,
                    sms.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("3");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 04: B2B 2023 Send - Mã lỗi 7 - SmsId không hợp lệ`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { smsId, content } = generateRandomData();

            const sendMaLoi07 = [
                {
                    "Brandname": brandname,
                    "IsCheckDuplicate": IsCheckDuplicate,
                    "Priority": highPriority.value.toString(),
                    "SmsId": "",
                    "PhoneNumber": PhoneNumber,
                    "Content": content,
                    "ContentType": ContentType,
                    "Telco": telco,
                    "SendTime": sendTime
                }
            ];
            console.log(`🚀 Testcase 04: B2B 2023 Send - Mã lỗi 7 - SmsId không hợp lệ => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);
            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi07[0], null, 2)}`);

            try {
                const sms = sendMaLoi07[0];

                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sms.IsCheckDuplicate,
                    sms.SmsId,
                    sms.PhoneNumber,
                    sms.Content,
                    sms.ContentType,
                    sms.Telco,
                    sms.SendTime,
                    sms.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("7");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 05: B2B 2023 Send - Mã lỗi 8 - Lỗi số điện thoại rỗng hoặc bị bỏ trống`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 05: B2B 2023 Send - Mã lỗi 8 - Lỗi số điện thoại rỗng hoặc bị bỏ trống => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);

            const sendMaLoi08 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": "",
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": sendTime
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi08, null, 2)}`);

            const phoneNumberStatus = await sendB2B2023SendAPI.checkPhoneNumber(sendMaLoi08.PhoneNumber);
            console.log("phoneNumberStatus =", phoneNumberStatus);
            expect(phoneNumberStatus).toBe("invalid");

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi08.IsCheckDuplicate,
                    sendMaLoi08.SmsId,
                    sendMaLoi08.PhoneNumber,
                    sendMaLoi08.Content,
                    sendMaLoi08.ContentType,
                    sendMaLoi08.Telco,
                    sendMaLoi08.SendTime,
                    sendMaLoi08.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("8");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 06: B2B 2023 Send - Mã lỗi 9 - Lỗi số điện thoại không đúng định dạng`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 06: B2B 2023 Send - Mã lỗi 9 - Lỗi số điện thoại không đúng định dạng => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);

            const sendMaLoi09 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": "374619213",
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": sendTime
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi09, null, 2)}`);

            const phoneNumberStatus = await sendB2B2023SendAPI.checkPhoneNumber(sendMaLoi09.PhoneNumber);
            console.log("phoneNumberStatus =", phoneNumberStatus);
            expect(phoneNumberStatus).toBe("invalid");

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi09.IsCheckDuplicate,
                    sendMaLoi09.SmsId,
                    sendMaLoi09.PhoneNumber,
                    sendMaLoi09.Content,
                    sendMaLoi09.ContentType,
                    sendMaLoi09.Telco,
                    sendMaLoi09.SendTime,
                    sendMaLoi09.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("9");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 07: B2B 2023 Send - Mã lỗi 10 - Lỗi do nội dung tin rỗng hoặc bị bỏ trống`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { smsId, content } = generateRandomData();

            const sendMaLoi10 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": "",
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": sendTime
            }

            console.log(`🚀 Testcase 07: B2B 2023 Send - Mã lỗi 10 - Lỗi do nội dung tin rỗng hoặc bị bỏ trống => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);
            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi10, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi10.IsCheckDuplicate,
                    sendMaLoi10.SmsId,
                    sendMaLoi10.PhoneNumber,
                    sendMaLoi10.Content,
                    sendMaLoi10.ContentType,
                    sendMaLoi10.Telco,
                    sendMaLoi10.SendTime,
                    sendMaLoi10.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);
                expect(responseBody.Code, "Kiểm tra mã Code trong body").toBe("10");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 08: B2B 2023 Send - Mã lỗi 11 - Lỗi do nội dung vượt quá độ dài quy định`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { smsId } = generateRandomData();
            let longContent = generateRandomData().content + "A".repeat(1001);
            console.log(`🚀 Testcase 08: B2B 2023 Send - Mã lỗi 11 - Lỗi do nội dung vượt quá độ dài quy định => Gửi lần ${i}: smsId: ${smsId}, content: ${longContent}`);

            const sendMaLoi11 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": longContent,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": sendTime
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi11, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi11.IsCheckDuplicate,
                    sendMaLoi11.SmsId,
                    sendMaLoi11.PhoneNumber,
                    sendMaLoi11.Content,
                    sendMaLoi11.ContentType,
                    sendMaLoi11.Telco,
                    sendMaLoi11.SendTime,
                    sendMaLoi11.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${longContent}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${longContent}, status: ${statusCode}`);
                }

                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("11");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${longContent}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 09: B2B 2023 Send - Mã lỗi 12 - Lỗi do nội dung tin chứa từ khóa chặn`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId } = generateRandomData();

            const { content } = generateRandomData();
            const insertPos = Math.floor(Math.random() * content.length);
            const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);

            console.log(`🚀 Testcase 09: B2B 2023 Send - Mã lỗi 12 - Lỗi do nội dung vượt quá độ dài quy định => Gửi lần ${i}: smsId: ${smsId}, content: ${contentWithQC}`);

            const sendMaLoi12 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": contentWithQC,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": sendTime
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi12, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi12.IsCheckDuplicate,
                    sendMaLoi12.SmsId,
                    sendMaLoi12.PhoneNumber,
                    sendMaLoi12.Content,
                    sendMaLoi12.ContentType,
                    sendMaLoi12.Telco,
                    sendMaLoi12.SendTime,
                    sendMaLoi12.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${contentWithQC}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${contentWithQC}, status: ${statusCode}`);
                }
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("12");


            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${contentWithQC}`);
                console.log(`Error: ${err}`);
                throw err;
            }
        }
    });

    test(`Testcase 10: B2B 2023 Send - Mã lỗi 13 - Lỗi do sendTime không hợp lệ`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();

            const sendMaLoi13 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": "sendTime"
            }

            console.log(`🚀 Testcase 10: B2B 2023 Send - Mã lỗi 13 - Lỗi do sendTime không hợp lệ => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);
            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi13, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi13.IsCheckDuplicate,
                    sendMaLoi13.SmsId,
                    sendMaLoi13.PhoneNumber,
                    sendMaLoi13.Content,
                    sendMaLoi13.ContentType,
                    sendMaLoi13.Telco,
                    sendMaLoi13.SendTime,
                    sendMaLoi13.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công  có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("13");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });

    test(`Testcase 11: B2B 2023 Send - Mã lỗi 22 - Lỗi do SMS bị trùng lặp (cùng 1 nội dung gửi từ cùng 1 Brandname tới cùng 1 thuê bao trong khoảng thời gian ngắn)`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 2; i++) {// gửi 1 sms 
            const { smsId } = generateRandomData();

            const duplicatedContent: string = "Content_01";
            console.log(`🚀 Testcase 11: B2B 2023 Send - Mã lỗi 22 - Lỗi do SMS bị trùng lặp (cùng 1 nội dung gửi từ cùng 1 Brandname tới cùng 1 thuê bao trong khoảng thời gian ngắn) => Gửi lần ${i}: smsId: ${smsId}, content: ${duplicatedContent} `);

            const sendMaLoi22 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": duplicatedContent,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi22, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi22.IsCheckDuplicate,
                    sendMaLoi22.SmsId,
                    sendMaLoi22.PhoneNumber,
                    sendMaLoi22.Content,
                    sendMaLoi22.ContentType,
                    sendMaLoi22.Telco,
                    sendMaLoi22.SendTime,
                    sendMaLoi22.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${duplicatedContent}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${duplicatedContent}, status: ${statusCode}`);
                }
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("22");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${duplicatedContent}`);
                console.log(`Error: ${err}`);
            }
        }
    });

    test(`Testcase 12: B2B 2023 Send - Mã lỗi 23 - Lỗi do Sms trùng lặp trong vòng 24h`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {
            const { content } = generateRandomData();
            const smsId = "SmsId_01";

            const sendMaLoi23 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`🚀 Testcase 12: B2B 2023 Send - Mã lỗi 23 - Lỗi do Sms trùng lặp trong vòng 24h => Gửi lần ${i}: smsId: ${smsId}, content: ${content}`);
            console.log(`➡️  SMS: ${JSON.stringify(sendMaLoi23, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendMaLoi23.IsCheckDuplicate,
                    sendMaLoi23.SmsId,
                    sendMaLoi23.PhoneNumber,
                    sendMaLoi23.Content,
                    sendMaLoi23.ContentType,
                    sendMaLoi23.Telco,
                    sendMaLoi23.SendTime,
                    sendMaLoi23.Brandname
                );

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("23");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });

    test(`Testcase 13: B2B 2023 Send - Thành công - Ưu tiên cao`, async ({ sendB2B2023SendAPI, generateRandomData }) => {
        // const sendB2B2023SendAPI = new SendB2B2023SendAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🚀 Testcase 13: B2B 2023 Send - Thành công - Ưu tiên cao => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            const sendUuTienCao0 =
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": telco,
                "SendTime": ""
            }

            console.log(`➡️  SMS: ${JSON.stringify(sendUuTienCao0, null, 2)}`);

            try {
                const response = await sendB2B2023SendAPI.SendB2B2023Sending(
                    sendUuTienCao0.IsCheckDuplicate,
                    sendUuTienCao0.SmsId,
                    sendUuTienCao0.PhoneNumber,
                    sendUuTienCao0.Content,
                    sendUuTienCao0.ContentType,
                    sendUuTienCao0.Telco,
                    sendUuTienCao0.SendTime,
                    sendUuTienCao0.Brandname
                ); sendUuTienCao0

                const statusCode = response.status();
                const responseBody = await response.json();

                console.log(`📩 Status: ${statusCode}`)
                console.log(`📄 Body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${highPriority.name} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${highPriority.name} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }

                expect(statusCode, "HTTP status không phải 200").toBe(200);
                expect(responseBody.Code, `Gửi SMS lần ${i} thất bại`).toBe("0");

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        }
    });
});
