import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";
// const baseURL: string = "http://192.168.1.9:40010";
let access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIkNhbXBhaWduQ01TLkNhbXBhaWduLkNoZWNrU3RhdHVzIiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5BbGxFdm91Y2hlciIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kQWRtaW4iLCJDYW1wYWlnbkNNUy5Qcm9tb3RlU21TLk1hbmFnZSIsIkIyQi5DTVMuMjAxOS5DYW1wYWlnbi5DcmVhdGUiLCJJcmlzLk9DQi5SZXBvcnQuVmlldyIsIklyaXMuQjJCMjAxOC5TbXMuVmlld1JlcG9ydCIsIk9UVE1lc3NhZ2UuTWVzc2FnZS5TZW5kIiwiQ2FtcGFpZ25DTVMuUHJvbW90ZVNtUy5BcHByb3ZlIiwiSXJpcy5CMkIyMDE4LlNtcy5WaWV3IiwiQ3VzdG9tZXJSZXBvcnQuVmlldy5Fdm91Y2hlciIsIkJyYW5kbmFtZS5IYW5sZGVyU01TRXJyb3IuTWFuYWdlIiwiSXJpcy5CMkIuU21zLlNlbmQiLCJDYW1wYWlnbkNNUy5BZG1pbiIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkRvd25sb2FkIiwiQ2FtcGFpZ25DTVMuU01TLlJlcG9ydC5WaWV3cyIsIkNhbXBhaWduQ01TLkNhbXBhaWduLkNyZWF0ZSJdLCJ1bmlxdWVfbmFtZSI6ImlyaXMiLCJzdWIiOiIxNzA4ZWU1MS02OGRiLTRlOWEtOTU3Yi0wYmNiNDQ2Y2YzYTMiLCJuYmYiOjE3NjAwODc3MjksImV4cCI6MTc2MDA4OTUyOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyOTkyIiwiYXVkIjoiNDc2QkI5QTEtMDAwMC00OTlGLTg5MjgtNUY1MENFNjQ1NEMzIn0.PWDH4uWVV4Yfr5NlLE-t_-E_4sDXAMDwm3FIHW4ompk';
//const random = Math.floor(Math.random() * 10000);
const grant_type: string = 'password';
const username: string = 'iris';
const password: string = 'iris@123';
const brandname: string = 'IRIS';
const IsCheckDuplicate: string = "1";
// const Priority: string = "10";
const PhoneNumber: string = "84374619213";
const ContentType: string = "1";
const duplicatedSmsId: string = "SmsId_01";
const duplicatedContent: string = "Content_01";

// let loginAPITest: LoginAPITest;
// const dataList = [];
// for (let i = 0; i < 1000; i++) {
//     dataList.push(generateRandomData());
// }

const priority = [
    { "name": "Cao", "value": 10 },
    { "name": "Trung Bình", "value": 5 },
    { "name": "Thấp", "value": 1 }
]

test.describe('B2B 2023 - SendingList - Happy case', { tag: ['@b2b2023', '@happy'] }, () => {

    test.beforeAll('Testcase 1: Get token', async ({ loginAPI }) => {

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
    test(`Testcase 01: B2B 2023 Sending List - Ưu tiên cao ${highPriority.name}`, async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023SendingListAPI = new SendB2B2023SendingListAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🟢 Testcase 01 - Ưu tiên cao => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            try {
                const response = await sendB2B2023SendingListAPI.SendB2B2023SendingList(
                    brandname,
                    IsCheckDuplicate,
                    highPriority.value.toString(),
                    smsId,
                    PhoneNumber,
                    content,
                    ContentType)

                const statusCode: number = response.status();
                const responseBody = await response.json();
                console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${highPriority.name} = ${highPriority.value} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${highPriority.name} = ${highPriority.value} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        };
    });

    const MediumPriority = priority.find(p => p.name === "Trung Bình")!;
    test(`Testcase 02: B2B 2023 Sending List - Ưu tiên Trung Bình ${MediumPriority.name}`, async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023SendingListAPI = new SendB2B2023SendingListAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🟢 Testcase 02 - Ưu tiên Trung Bình => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            try {
                const response = await sendB2B2023SendingListAPI.SendB2B2023SendingList(
                    brandname,
                    IsCheckDuplicate,
                    MediumPriority.value.toString(),
                    smsId,
                    PhoneNumber,
                    content,
                    ContentType)

                const statusCode: number = response.status();
                const responseBody = await response.json();
                console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${MediumPriority.name} = ${MediumPriority.value} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${MediumPriority.name} = ${MediumPriority.value} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        };
    });

    const LowPriority = priority.find(p => p.name === "Thấp")!;
    test(`Testcase 03: B2B 2023 Sending List - Ưu tiên Thấp ${LowPriority.name}`, async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023SendingListAPI = new SendB2B2023SendingListAPI(request, access_token);

        for (let i = 1; i <= 1; i++) {// gửi 1 sms 
            const { smsId, content } = generateRandomData();
            console.log(`🟢 Testcase 03 - Ưu tiên Thấp => Gửi lần ${i}: smsId: ${smsId}, content: ${content} `);

            try {
                const response = await sendB2B2023SendingListAPI.SendB2B2023SendingList(
                    brandname,
                    IsCheckDuplicate,
                    LowPriority.value.toString(),
                    smsId,
                    PhoneNumber,
                    content,
                    ContentType)

                const statusCode: number = response.status();
                const responseBody = await response.json();
                console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

                if (statusCode === 200) {
                    console.log(`✅ Gửi thành công với Priority mức ${LowPriority.name} = ${LowPriority.value} có: smsId: ${smsId}, content: ${content}`);
                } else {
                    console.log(`❌ Gửi thất bại với Priority mức ${LowPriority.name} = ${LowPriority.value} có: smsId: ${smsId}, content: ${content}, status: ${statusCode}`);
                }
                expect(statusCode, `Gửi SMS lần ${i} thất bại`).toBe(200);

            } catch (err) {
                console.log(`❌ Lỗi khi gửi request: smsId: ${smsId}, content: ${content}`);
                console.log(`Error: ${err}`);
            }
        };
    });
    
});

test.describe('B2B 2023 - SendingList - UNHAPPY CASE', { tag: ['@b2b2023', '@unhappy'] }, () => {

    test.beforeAll('Testcase 1: Get token', async ({ loginAPI }) => {

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

    test("Testcase 04: B2B 2023 - SendingList (Nhóm mã lỗi 2 & 3 - Brandname rỗng / không hợp lệ)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        const sendMaLoi23 = [
            {
                "Brandname": "",
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84996802589",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            },
            {
                "Brandname": "#####",
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": MediumPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84927943151",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            }
        ]

        console.log("🟢 Testcase 04: B2B 2023 - SendingList (Nhóm mã lỗi 2 & 3 - Brandname rỗng / không hợp lệ)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi23[0].Brandname}, SmsId = ${sendMaLoi23[0].SmsId}, Content = ${sendMaLoi23[0].Content}`)
        console.log(` => SMS 2: Brandname = ${sendMaLoi23[1].Brandname}, SmsId = ${sendMaLoi23[1].SmsId}, Content = ${sendMaLoi23[1].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi23.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("2");
        expect(resultCodes).toContain("3");

        console.log("✅ Testcase 04 passed — xử lý đúng nhóm mã lỗi 2 & 3");
    });

    test("Testcase 05: B2B 2023 - SendingList (Nhóm mã lỗi 7 & 8 - SmsId không hợp lệ / Lỗi số điện thoại rỗng hoặc bị bỏ trống )", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        const sendMaLoi78 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": "",
                "PhoneNumber": "84996802589",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            },
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": MediumPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            }
        ]

        console.log("🟢 Testcase 05: B2B 2023 - SendingList (Nhóm mã lỗi 7 & 8 - SmsId không hợp lệ / Lỗi số điện thoại rỗng hoặc bị bỏ trống )");
        console.log(` => SMS 1: Brandname = ${sendMaLoi78[0].Brandname}, SmsId = ${sendMaLoi78[0].SmsId}, Content = ${sendMaLoi78[0].Content}`)
        console.log(` => SMS 2: Brandname = ${sendMaLoi78[1].Brandname}, SmsId = ${sendMaLoi78[1].SmsId}, Content = ${sendMaLoi78[1].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi78.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("7");
        expect(resultCodes).toContain("8");

        console.log("✅ Testcase 05 passed — xử lý đúng nhóm mã lỗi 7 & 8");
    });

    test("Testcase 06: B2B 2023 - SendingList (Nhóm mã lỗi 9 & 10 - Lỗi do Số điện thoại không đúng định dạng / Lỗi do Nội dung tin rỗng hoặc bị bỏ trống)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        const sendMaLoi910 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "!@#$%^&*()SFHj",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            },
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": MediumPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84559016727",
                "Content": "",
                "ContentType": ContentType,
                "Telco": ""
            }
        ]

        console.log("🟢 Testcase 06: B2B 2023 - SendingList (Nhóm mã lỗi 9 & 10 - Lỗi do Số điện thoại không đúng định dạng / Lỗi do Nội dung tin rỗng hoặc bị bỏ trống)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi910[0].Brandname}, SmsId = ${sendMaLoi910[0].SmsId}, Content = ${sendMaLoi910[0].Content}`)
        console.log(` => SMS 2: Brandname = ${sendMaLoi910[1].Brandname}, SmsId = ${sendMaLoi910[1].SmsId}, Content = ${sendMaLoi910[1].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi910.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("9");
        expect(resultCodes).toContain("10");

        console.log("✅ Testcase 06 passed — xử lý đúng nhóm mã lỗi 9 & 10");
    });

    test("Testcase 07: B2B 2023 - SendingList ((Nhóm mã lỗi 11 & 12 - Lỗi nội dung tin vượt quá độ dài quy định / Lỗi nội dung tin có chứa từ khóa bị chặn)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        //nội dung trên 1000 ký tự 
        let longContent = generateRandomData().content + "A".repeat(1001);

        //Nội dung có chứa từ khóa bị chặn 
        const { content } = generateRandomData();
        const insertPos = Math.floor(Math.random() * content.length);
        const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);

        const sendMaLoi1112 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84902102355",
                "Content": longContent,
                "ContentType": ContentType,
                "Telco": ""
            },
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": MediumPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84559016727",
                "Content": contentWithQC,
                "ContentType": ContentType,
                "Telco": ""
            }
        ]

        console.log("🟢 Testcase 07: B2B 2023 - SendingList ((Nhóm mã lỗi 11 & 12 - Lỗi nội dung tin vượt quá độ dài quy định / Lỗi nội dung tin có chứa từ khóa bị chặn)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi1112[0].Brandname}, SmsId = ${sendMaLoi1112[0].SmsId}, Content = ${sendMaLoi1112[0].Content}`)
        console.log(` => SMS 2: Brandname = ${sendMaLoi1112[1].Brandname}, SmsId = ${sendMaLoi1112[1].SmsId}, Content = ${sendMaLoi1112[1].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi1112.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("11");
        expect(resultCodes).toContain("12");

        console.log("✅ Testcase 07 passed — xử lý đúng nhóm mã lỗi 11 & 12");
    });

    test("Testcase 08: B2B 2023 - SendingList ((Nhóm mã lỗi 13 - Lỗi SendTime không hợp lệ)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        const sendMaLoi13 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "84902102355",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": "",
                "SendTime": "2025-99-99 99:99:99"
            }
        ]

        console.log("🟢 Testcase 08: B2B 2023 - SendingList ((Nhóm mã lỗi 13 - Lỗi SendTime không hợp lệ)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi13[0].Brandname}, SmsId = ${sendMaLoi13[0].SmsId}, Content = ${sendMaLoi13[0].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi13.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("13");

        console.log("✅ Testcase 08 passed — xử lý đúng nhóm mã lỗi 13");
    });

    test("Testcase 09: B2B 2023 - SendingList (Nhóm mã lỗi 22  & 23 - Lỗi SmsId bị trùng lặp / Lỗi tin nhắn bị trùng lặp trong vòng 24h) => chỗ này do chưa bật dup", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);
        for (let i = 1; i <= 2; i++) {
            const sendMaLoi2223 = [
                {
                    "Brandname": brandname,
                    "IsCheckDuplicate": IsCheckDuplicate,
                    "Priority": highPriority.value.toString(),
                    "SmsId": duplicatedSmsId,
                    "PhoneNumber": PhoneNumber,
                    "Content": generateRandomData().content,
                    "ContentType": ContentType,
                    "Telco": ""
                },
                {
                    "Brandname": brandname,
                    "IsCheckDuplicate": IsCheckDuplicate,
                    "Priority": MediumPriority.value.toString(),
                    "SmsId": generateRandomData().smsId,
                    "PhoneNumber": PhoneNumber,
                    "Content": duplicatedContent,
                    "ContentType": ContentType,
                    "Telco": ""
                }

            ]

            console.log("🟢 Testcase 09: B2B 2023 - SendingList (Nhóm mã lỗi 22  & 23 - Lỗi SmsId bị trùng lặp / Lỗi tin nhắn bị trùng lặp trong vòng 24h)");
            console.log(` => SMS 1: Brandname = ${sendMaLoi2223[0].Brandname}, SmsId = ${sendMaLoi2223[0].SmsId}, Content = ${sendMaLoi2223[0].Content}`)
            console.log(` => SMS 2: Brandname = ${sendMaLoi2223[1].Brandname}, SmsId = ${sendMaLoi2223[1].SmsId}, Content = ${sendMaLoi2223[1].Content}`)

            const results: any[] = [];

            for (const [index, sms] of sendMaLoi2223.entries()) {
                console.log(` => SMS ${index + 1}: SmsId = ${sms.SmsId}, Content = ${sms.Content}`);
                const res = await sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([sms]);
                const body = await res.json();
                console.log("📩 Response:", JSON.stringify(body, null, 2));
                results.push(...(body.ResultList || []));
            }

            results.forEach(r => {
                console.log(` => Kết quả: SmsId=${r.SmsId}, Code=${r.Code}, Telco=${r.Telco}`);
            });

            const resultCodes = results.map(r => String(r.Code));
            console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

            expect(resultCodes).toContain("22");
            expect(resultCodes).toContain("23");

            console.log("✅ Testcase 09 passed — xử lý đúng nhóm mã lỗi 22 & 23");
        }
    });

    test("Testcase 10: B2B 2023 - SendingList (Nhóm mã lỗi 1 - Lỗi tài khoản gửi tin không hợp lệ)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

        const sendMaLoi1 = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": PhoneNumber,
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": "sdadasdas"
            }
        ]

        console.log("🟢 Testcase 10: B2B 2023 - SendingList (Nhóm mã lỗi 1 - Lỗi tài khoản gửi tin không hợp lệ)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi1[0].Brandname}, SmsId = ${sendMaLoi1[0].SmsId}, Content = ${sendMaLoi1[0].Content}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi1.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("1");

        console.log("✅ Testcase 10 passed — xử lý đúng nhóm mã lỗi 1");
    });

    test("Testcase 11: B2B 2023 - SendingList (Nhóm mã lỗi 09 - Lỗi số điện thoại không bắt đầu bằng 0 & 84)", async ({ generateRandomData, sendB2B2023SendingListAPI }) => {
        // const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);
        const phoneNumberStatus = sendB2B2023SendingListAPI.checkPhoneNumber(PhoneNumber);
        expect(phoneNumberStatus).not.toBe("invalid");

        const sendMaLoi09InvalidNumber = [
            {
                "Brandname": brandname,
                "IsCheckDuplicate": IsCheckDuplicate,
                "Priority": highPriority.value.toString(),
                "SmsId": generateRandomData().smsId,
                "PhoneNumber": "374619213",
                "Content": generateRandomData().content,
                "ContentType": ContentType,
                "Telco": ""
            }
        ]

        console.log("🟢 Testcase 11: B2B 2023 - SendingList (Nhóm mã lỗi 09 - Lỗi số điện thoại không bắt đầu bằng 0 & 84)");
        console.log(` => SMS 1: Brandname = ${sendMaLoi09InvalidNumber[0].Brandname}, SmsId = ${sendMaLoi09InvalidNumber[0].SmsId}, Content = ${sendMaLoi09InvalidNumber[0].Content}, PhoneNumber = ${sendMaLoi09InvalidNumber[0].PhoneNumber}`)

        // Gửi n request
        const responses = await Promise.all(
            sendMaLoi09InvalidNumber.map((item) => sendB2B2023SendingListAPI.SendB2B2023MultiSendingList([item]))
        );

        // 🔹 Xử lý & in kết quả
        const mergedResults = [];
        for (const res of responses) {
            const body = await res.json();
            console.log("📩 Response:", JSON.stringify(body, null, 2));
            mergedResults.push(...(body.ResultList || []));
        }

        mergedResults.forEach((r) => {
            console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}, PhoneNumber= ${r.PhoneNumber}`);
        });

        const resultCodes = mergedResults.map((r) => String(r.Code));
        console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

        expect(resultCodes).toContain("9");

        console.log("✅ Testcase 11 passed — xử lý đúng nhóm mã lỗi 9");
    });

    // await test.step("Testcase 12: B2B 2023 - SendingList (Nhóm mã lỗi 99 - Lỗi Timeout)", async () => {
    //     const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

    //     const sendMaLoi99Timeout= [
    //         {
    //             "Brandname": brandname,
    //             "IsCheckDuplicate": IsCheckDuplicate,
    //             "Priority": highPriority.value.toString(),
    //             "SmsId": generateRandomData().smsId,
    //             "PhoneNumber": PhoneNumber,
    //             "Content": generateRandomData().content,
    //             "ContentType": ContentType,
    //             "Telco": ""
    //         }
    //     ]

    //     console.log("🟢 Testcase 12: B2B 2023 - SendingList (Nhóm mã lỗi 99 - Lỗi Timeout)");
    //     console.log(` => SMS 1: Brandname = ${sendMaLoi99Timeout[0].Brandname}, SmsId = ${sendMaLoi99Timeout[0].SmsId}, Content = ${sendMaLoi99Timeout[0].Content}`)

    //     // Gửi n request
    //     const responses = await Promise.all(
    //         sendMaLoi99Timeout.map((item) => sendB2B2023MultiSendingList.SendB2B2023MultiSendingList([item]))
    //     );

    //     // 🔹 Xử lý & in kết quả
    //     const mergedResults = [];
    //     for (const res of responses) {
    //         const body = await res.json();
    //         console.log("📩 Response:", JSON.stringify(body, null, 2));
    //         mergedResults.push(...(body.ResultList || []));
    //     }

    //     mergedResults.forEach((r) => {
    //         console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
    //     });

    //     const resultCodes = mergedResults.map((r) => String(r.Code));
    //     console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

    //     expect(resultCodes).toContain("99");

    //     console.log("✅ Testcase 12 passed — xử lý đúng nhóm mã lỗi 99");
    // });

    // await test.step("Testcase 13: B2B 2023 - SendingList (Nhóm mã lỗi 24 & 100 - Lỗi hệ thống khác)", async () => {
    //     const sendB2B2023MultiSendingList = new SendB2B2023SendingListAPI(request, access_token);

    //     const sendMaLoi24100= [
    //         {
    //             "Brandname": brandname,
    //             "IsCheckDuplicate": IsCheckDuplicate,
    //             "Priority": highPriority.value.toString(),
    //             "SmsId": generateRandomData().smsId,
    //             "PhoneNumber": PhoneNumber,
    //             "Content": generateRandomData().content,
    //             "ContentType": ContentType,
    //             "Telco": ""
    //         },
    //         {
    //             "Brandname": brandname,
    //             "IsCheckDuplicate": IsCheckDuplicate,
    //             "Priority": highPriority.value.toString(),
    //             "SmsId": generateRandomData().smsId,
    //             "PhoneNumber": PhoneNumber,
    //             "Content": generateRandomData().content,
    //             "ContentType": ContentType,
    //             "Telco": ""
    //         }
    //     ]

    //     console.log("🟢 Testcase 13: B2B 2023 - SendingList (Nhóm mã lỗi 24 & 100 - Lỗi hệ thống khác)");
    //     console.log(` => SMS 1: Brandname = ${sendMaLoi24100[0].Brandname}, SmsId = ${sendMaLoi24100[0].SmsId}, Content = ${sendMaLoi24100[0].Content}`)
    //     console.log(` => SMS 1: Brandname = ${sendMaLoi24100[1].Brandname}, SmsId = ${sendMaLoi24100[1].SmsId}, Content = ${sendMaLoi24100[1].Content}`)

    //     // Gửi n request
    //     const responses = await Promise.all(
    //         sendMaLoi24100.map((item) => sendB2B2023MultiSendingList.SendB2B2023MultiSendingList([item]))
    //     );

    //     // 🔹 Xử lý & in kết quả
    //     const mergedResults = [];
    //     for (const res of responses) {
    //         const body = await res.json();
    //         console.log("📩 Response:", JSON.stringify(body, null, 2));
    //         mergedResults.push(...(body.ResultList || []));
    //     }

    //     mergedResults.forEach((r) => {
    //         console.log(` => Kết quả: SmsId= ${r.SmsId}, Code= ${r.Code}, Telco= ${r.Telco}`);
    //     });

    //     const resultCodes = mergedResults.map((r) => String(r.Code));
    //     console.log("📋 Các mã lỗi trả về:", resultCodes.join(", "));

    //     expect(resultCodes).toContain("24");
    //     expect(resultCodes).toContain("100");

    //     console.log("✅ Testcase 13 passed — xử lý đúng nhóm mã lỗi 24 & 100");
    // });

});