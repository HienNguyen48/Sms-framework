import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

let access_token: string = '';
const isCheckDuplicate: string = "1";
const isCheckDuplicate1: string = "0";
const messageType: string = "30";
const brandname: string = 'IRIS';
const PhoneNumber: string = "84374619213";
const ContentType: string = "1";

// let loginAPITest: LoginAPITest;

test.describe('MBBANK - SendingList - HAPPY CASE', { tag: ['@mbbank', '@happy'] }, () => {

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

    // ---------------- TESTCASE 01 ----------------
    test(`Testcase 01: MB - SendingList -  Brandname is missing & Brandname or telco is invalid`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const { smsId: smsId3, content: content3 } = generateRandomData();
        const brandnameIsMissing = "";
        const brandnameIsInvalid = "ACB";
        const telcoIsInvalid = "kkkk";

        const Maloi23 = [
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId1,
                "PhoneNumber": PhoneNumber,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandnameIsMissing
            },
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId2,
                "PhoneNumber": PhoneNumber,
                "Content": content2,
                "ContentType": ContentType,
                "Brandname": brandnameIsInvalid
            },
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId3,
                "PhoneNumber": PhoneNumber,
                "Content": content3,
                "ContentType": ContentType,
                "Brandname": brandname,
                "Telco": telcoIsInvalid
            }
        ]
        console.log("🚀  Testcase 01: MB - SendingList -  Brandname is missing & Brandname or telco is invalid");
        console.log(` => SMS 1: Brandname = ${Maloi23[0].Brandname}, SmsId = ${Maloi23[0].SmsId}, Content = ${Maloi23[0].Content}`);
        console.log(` => SMS 2: Brandname = ${Maloi23[1].Brandname}, SmsId = ${Maloi23[1].SmsId}, Content = ${Maloi23[1].Content}`);
        console.log(` => SMS 3: Brandname = ${Maloi23[2].Brandname}, SmsId = ${Maloi23[2].SmsId}, Content = ${Maloi23[2].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi23);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
            { Index: Index2, SmsId: SmsId2, Code: Code2, Telco: Telco2, Description: Description2 },
            { Index: Index3, SmsId: SmsId3, Code: Code3, Telco: Telco3, Description: Description3 }
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });
        console.log("📩 In ra kết quả Result 2:", { Index2, SmsId2, Code2, Telco2, Description2 });
        console.log("📩 In ra kết quả Result 3:", { Index3, SmsId3, Code3, Telco3, Description3 });

        expect(Code1).toBe("2");
        expect(Description1).toBe("Brandname is missing");

        expect(Code2).toBe("3");
        expect(Description2).toBe("Brandname is invalid");

        console.log("✅ Testcase 01 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");

    });

    // ---------------- TESTCASE 02 ----------------
    test(`Testcase 02: MB - SendingList -  SmsId is invalid & PhoneNumber is missing`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const smsIdInvalid = "";
        const phoneNumberIsMissing = "";

        const Maloi78 = [
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsIdInvalid,
                "PhoneNumber": PhoneNumber,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandname
            },
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId2,
                "PhoneNumber": phoneNumberIsMissing,
                "Content": content2,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 02: MB - SendingList -  SmsId is invalid & PhoneNumber is missing");
        console.log(` => SMS 1: Brandname = ${Maloi78[0].Brandname}, SmsId = ${Maloi78[0].SmsId}, Content = ${Maloi78[0].Content}`);
        console.log(` => SMS 2: Brandname = ${Maloi78[1].Brandname}, SmsId = ${Maloi78[1].SmsId}, Content = ${Maloi78[1].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi78);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
            { Index: Index2, SmsId: SmsId2, Code: Code2, Telco: Telco2, Description: Description2 },
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });
        console.log("📩 In ra kết quả Result 2:", { Index2, SmsId2, Code2, Telco2, Description2 });

        expect(Code1).toBe("7");
        expect(Description1).toBe("SmsId is invalid");

        expect(Code2).toBe("8");
        expect(Description2).toBe("PhoneNumber is missing");

        console.log("✅ Testcase 02 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 03 ----------------
    test(`Testcase 03: MB - SendingList -  PhoneNumber is invalid & Content is missing`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const phoneNumberInvalid = "090452636999999999999999999999999999999999999999999999999";
        const contentIsMissing = "";

        const Maloi910 = [
            {
                "IsCheckDuplicate": isCheckDuplicate1,
                "MessageType": messageType,
                "SmsId": smsId1,
                "PhoneNumber": phoneNumberInvalid,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandname
            },
            {
                "IsCheckDuplicate": isCheckDuplicate1,
                "MessageType": messageType,
                "SmsId": smsId2,
                "PhoneNumber": PhoneNumber,
                "Content": contentIsMissing,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 03: MB - SendingList -  PhoneNumber is invalid & Content is missing");
        console.log(` => SMS 1: Brandname = ${Maloi910[0].Brandname}, SmsId = ${Maloi910[0].SmsId}, Content = ${Maloi910[0].Content}`);
        console.log(` => SMS 2: Brandname = ${Maloi910[1].Brandname}, SmsId = ${Maloi910[1].SmsId}, Content = ${Maloi910[1].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi910);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
            { Index: Index2, SmsId: SmsId2, Code: Code2, Telco: Telco2, Description: Description2 },
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });
        console.log("📩 In ra kết quả Result 2:", { Index2, SmsId2, Code2, Telco2, Description2 });

        expect(Code1).toBe("9");
        expect(Description1).toBe("090452636999999999999999999999999999999999999999999999999: PhoneNumber is invalid");

        expect(Code2).toBe("10");
        expect(Description2).toBe("Content is missing");

        console.log("✅ Testcase 03 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");
    });

    // ---------------- TESTCASE 04 ----------------
    test(`Testcase 04: MB - SendingList -  Content is invalid & Message is dupplicate`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const contentInvalid = "Các biệt thự thuộc địa của thành phố, cùng với đó là con đường rộng rãi của một xã hội quán cà phê đầy sống động đã nhắc nhở bạn về những ngày thống trị của thực dân Pháp tại nước ta. Trong 10 năm qua Sài Gòn đã có một sự thay đổi ngoạn mục và vươn mình có thể thấy rõ điều đó có qua quang cảnh của toàn thành phố. Du khách có thể dễ dàng nhận thấy đó chính là khu vực của Quận 1, với hàng loạt những tòa nhà cao chọc trời, cùng với đó chính là những căn hộ sang trọng. Nơi tập trung diễn ra nhiều những hoạt động lớn của nước ta.Chính vì nhờ có sự phát triển mà Sài Gòn đã trở thành một trong những địa điểm du lịch vô cùng hấp dẫn với nhiều những vị khách.";
        const messageIsDuplicate = "abc";

        const Maloi1122 = [
            {
                "IsCheckDuplicate": isCheckDuplicate1,
                "MessageType": messageType,
                "SmsId": smsId1,
                "PhoneNumber": PhoneNumber,
                "Content": contentInvalid,
                "ContentType": ContentType,
                "Brandname": brandname
            },
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId2,
                "PhoneNumber": PhoneNumber,
                "Content": messageIsDuplicate,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 04: MB - SendingList -  Content is invalid & Message is dupplicate");
        console.log(` => SMS 1: Brandname = ${Maloi1122[0].Brandname}, SmsId = ${Maloi1122[0].SmsId}, Content = ${Maloi1122[0].Content}`);
        console.log(` => SMS 2: Brandname = ${Maloi1122[1].Brandname}, SmsId = ${Maloi1122[1].SmsId}, Content = ${Maloi1122[1].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi1122);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
            { Index: Index2, SmsId: SmsId2, Code: Code2, Telco: Telco2, Description: Description2 },
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });
        console.log("📩 In ra kết quả Result 2:", { Index2, SmsId2, Code2, Telco2, Description2 });

        expect(Code1).toBe("11");
        expect(Description1).toBe("Content is invalid");

        expect(Code2).toBe("22");
        expect(Description2).toBe("Message is duplicated");

        console.log("✅ Testcase 04 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");

    });

    // ---------------- TESTCASE 05 ----------------
    test(`Testcase 05: MB - SendingList -  Mesage is rejected`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const insertPos = Math.floor(Math.random() * content1.length);
        const contentWithQC = content1.slice(0, insertPos) + "<QC>" + content1.slice(insertPos);

        const Maloi12 = [
            {
                "IsCheckDuplicate": isCheckDuplicate1,
                "MessageType": messageType,
                "SmsId": smsId1,
                "PhoneNumber": PhoneNumber,
                "Content": contentWithQC,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 05: MB - SendingList -  Mesage is rejected");
        console.log(` => SMS 1: Brandname = ${Maloi12[0].Brandname}, SmsId = ${Maloi12[0].SmsId}, Content = ${Maloi12[0].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi12);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();

        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 }
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });

        expect(Code1).toBe("12");
        expect(Description1).toBe("Message is rejected");

        console.log("✅ Testcase 05 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");

    });

    // ---------------- TESTCASE 06 ----------------
    test(`Testcase 06: MB - SendingList - SmsId is dupplicate`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const smsIdDuplicate = "smsId001";

        const Maloi23 = [
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsIdDuplicate,
                "PhoneNumber": PhoneNumber,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 06: MB - SendingList - SmsId is dupplicate");
        console.log(` => SMS 1: Brandname = ${Maloi23[0].Brandname}, SmsId = ${Maloi23[0].SmsId}, Content = ${Maloi23[0].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi23);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();

        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });

        expect(Code1).toBe("23");
        expect(Description1).toBe("SmsId is duplicated");

        console.log("✅ Testcase 06 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");

    });

    // ---------------- TESTCASE 07 ----------------
    test(`Testcase 07: MB - SendingList -  MessageType is invalid`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const MessageTypeIsInvalid = "";

        const Maloi98 = [
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": MessageTypeIsInvalid,
                "SmsId": smsId1,
                "PhoneNumber": PhoneNumber,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 07: MB - SendingList -  MessageType is invalid");
        console.log(` => SMS 1: Brandname = ${Maloi98[0].Brandname}, SmsId = ${Maloi98[0].SmsId}, Content = ${Maloi98[0].Content}`);

        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Maloi98);

        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(400);

        const body = await responses.json();

        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });

        expect(Code).toBe("400");
        expect(Message).toBe("SendingList is invalid");
        expect(Data).toBe(false);

        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
        ] = ResultList;

        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });

        expect(Code1).toBe("98");
        expect(Description1).toBe("MessageType is invalid");

        console.log("✅ Testcase 07 passed — Response hợp lệ! — Code: 400");

        console.log("\n" + "=".repeat(100) + "\n");

    });

});

test.describe('MBBANK - SendingList - HAPPY CASE', { tag: ['@mbbank', '@happy'] }, () => {

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

    // ---------------- TESTCASE 01 ----------------
    test(`Testcase 01: MB - SendingList -  Success`, async ({ sendMBSendingListAPI, generateRandomData }) => {
        const { smsId: smsId1, content: content1 } = generateRandomData();
        const { smsId: smsId2, content: content2 } = generateRandomData();
        const Thanhcong = [
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId1,
                "PhoneNumber": PhoneNumber,
                "Content": content1,
                "ContentType": ContentType,
                "Brandname": brandname
            },
            {
                "IsCheckDuplicate": isCheckDuplicate,
                "MessageType": messageType,
                "SmsId": smsId2,
                "PhoneNumber": PhoneNumber,
                "Content": content2,
                "ContentType": ContentType,
                "Brandname": brandname
            }
        ]
        console.log("🚀  Testcase 01: MB - SendingList -  Success");
        console.log(` => SMS 1: Brandname = ${Thanhcong[0].Brandname}, SmsId = ${Thanhcong[0].SmsId}, Content = ${Thanhcong[0].Content}`);
        console.log(` => SMS 2: Brandname = ${Thanhcong[1].Brandname}, SmsId = ${Thanhcong[1].SmsId}, Content = ${Thanhcong[1].Content}`);
        const responses = await sendMBSendingListAPI.SendMBMultiSendingList(Thanhcong);
        console.log("👉 Status thực tế:", responses.status());
        expect(responses.status()).toBe(201);

        const body = await responses.json();
        console.log("📩 Response:", JSON.stringify(body, null, 2));

        const { Code, Message, Data, ResultList } = body;
        console.log("📩 Response:", { Code, Message, Data, ResultList });
        expect(Code).toBe("201");
        expect(Message).toBe("Success");
        expect(Data).toBe(true);
        const [
            { Index: Index1, SmsId: SmsId1, Code: Code1, Telco: Telco1, Description: Description1 },
            { Index: Index2, SmsId: SmsId2, Code: Code2, Telco: Telco2, Description: Description2 }
        ] = ResultList;
        console.log("📩 In ra kết quả Result 1:", { Index1, SmsId1, Code1, Telco1, Description1 });
        console.log("📩 In ra kết quả Result 2:", { Index2, SmsId2, Code2, Telco2, Description2 })
        expect(Code1).toBe("0");
        expect(Description1).toBe("Success");
        console.log("✅ Testcase 10 passed — Response hợp lệ! — Code: 201");
        console.log("\n" + "=".repeat(100) + "\n");

    });


});