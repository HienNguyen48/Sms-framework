import { test, expect } from "../../../src/fixture/moi-truong-dev-fixture/api/common-fixture";

test.describe('OCB - Send - UNHAPPY CASE', { tag: ['@ocbsend', '@unhappy'] }, () => {

     const ServiceID: string = 'OCB';
     const ContentType: string = '30';
     const PhoneNumber: string = "84374619213";
     const Telco: string = "";
     const phoneNumberIsInvalid = "849048989998888888888";
     const duplicateMessageIsInvalid: string = "Nội dung trùng lặp thử nghiệm";
     const usernameIsInvalid: string = "";
     const passwordIsInvalid: string = "iris@12333333";


     test(`Testcase 01: OCB Send - PhoneNumber Is Invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               console.log(`🟢 Testcase 01: Mã lỗi 1 - PhoneNumber Is Invalid => Gửi tin lần ${i}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         content,
                         phoneNumberIsInvalid,
                         smsId,
                         ContentType,
                         Telco
                    );
                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("1");
                    expect(Message).toBe("PhoneNumber invalid");

                    console.log("✅ Testcase 01 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 02: OCB Send - Dupplicate Message`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");
          for (let i = 1; i <= 3; i++) {
               const { smsId, content } = generateRandomData();
               console.log(`🟢 Testcase 02: Mã lỗi 1 - Dupplicate Message => Gửi tin lần ${i}:  có smsId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         duplicateMessageIsInvalid,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("2");
                    expect(Message).toBe("Dupplicate Message");

                    console.log("✅ Testcase 02 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 03: OCB Send - UserId or password invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               console.log(`🟢 Testcase 03: Mã lỗi 3 - UserId or password invalid => Gửi tin lần ${i}:  có smsId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         usernameIsInvalid,
                         password,
                         ServiceID,
                         content,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("3");
                    expect(Message).toBe("UserId or password invalid");

                    console.log("✅ Testcase 03 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 04: Mã lỗi 3 - UserId or password invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               console.log(`🟢 Testcase 04: Mã lỗi 3 - UserId or password invalid => Gửi tin lần ${i}:  có smsId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         passwordIsInvalid,
                         ServiceID,
                         content,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("3");
                    expect(Message).toBe("UserId or password invalid");

                    console.log("✅ Testcase 04 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 05: OCB Send - Mã lỗi 4 - Message is rejected`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               const insertPos = Math.floor(Math.random() * content.length);
               const contentWithQC = content.slice(0, insertPos) + "<QC>" + content.slice(insertPos);
               console.log(`🟢 Testcase 05: OCB Send - Mã lỗi 4 - Message is rejected => Gửi tin lần ${i}:  có smsId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         contentWithQC,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("4");
                    expect(Message).toBe("Message is rejected");

                    console.log("✅ Testcase 05 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 06: OCB Send - Mã lỗi 4 - Message length invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               let longContent = generateRandomData().content + "A".repeat(10001);
               console.log(`🟢 Testcase 06: OCB Send - Mã lỗi 4 - Message length invalid => Gửi tin lần ${i}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         longContent,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("4");
                    expect(Message).toBe("Message length invalid");

                    console.log("✅ Testcase 06 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 07: OCB Send - Mã lỗi 5 - SMS_ID invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               const smsIdIsInvalid = "";
               console.log(`🟢 Testcase 07: OCB Send - Mã lỗi 5 - SMS_ID invalid => Gửi tin lần ${i}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         content,
                         PhoneNumber,
                         smsIdIsInvalid,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("5");
                    expect(Message).toBe("SMS_ID invalid");

                    console.log("✅ Testcase 07 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 08: OCB Send - Mã lỗi 5 - SmsId is duplicated`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 2; i++) {
               const { smsId, content } = generateRandomData();
               const smsIdIsDuplicate = "sms_Id001";
               console.log(`🟢 Testcase 08: OCB Send - Mã lỗi 5 - SmsId is duplicated => Gửi tin lần ${i}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         content,
                         PhoneNumber,
                         smsIdIsDuplicate,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("23");
                    expect(Message).toBe("SmsId is duplicated");

                    console.log("✅ Testcase 08 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

     test(`Testcase 09: OCB Send - Mã lỗi 5 - ServiceID invalid`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 2; i++) {
               const { smsId, content } = generateRandomData();
               const smsIdIsDuplicate = "sms_Id001";
               console.log(`🟢 Testcase 09: OCB Send - Mã lỗi 5 - ServiceID invalid => Gửi tin lần ${i}`);
               const serviceIdInValid = "";

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         serviceIdInValid,
                         content,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );

                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("5");
                    expect(Message).toBe("ServiceID invalid");

                    console.log("✅ Testcase 09 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });
});

test.describe('OCB - Send - HAPPY CASE', { tag: ['@ocbsend', '@happy'] }, () => {

     const ServiceID: string = 'OCB';
     const ContentType: string = '30';
     const PhoneNumber: string = "84374619213";
     const Telco: string = "";
     const phoneNumberIsInvalid = "849048989998888888888";
     const duplicateMessageIsInvalid: string = "Nội dung trùng lặp thử nghiệm";
     const usernameIsInvalid: string = "";
     const passwordIsInvalid: string = "iris@12333333";


     test(`Testcase 10: OCB Send - Success`, async ({ sendOCBHOSendAPI, generateRandomData, envEnvironmentVariables }) => {
          const username = envEnvironmentVariables.get("USERNAME");
          const password = envEnvironmentVariables.get("PASSWORD");

          for (let i = 1; i <= 1; i++) {
               const { smsId, content } = generateRandomData();
               console.log(`🟢 Testcase 01: OCB - Success => Gửi tin lần ${i}`);

               try {
                    const responses = await sendOCBHOSendAPI.SendOCBHOSend(
                         username,
                         password,
                         ServiceID,
                         content,
                         PhoneNumber,
                         smsId,
                         ContentType,
                         Telco
                    );
                    console.log("👉 Status thực tế:", responses.status());
                    expect(responses.status()).toBe(200);

                    const body = await responses.json();
                    console.log("📩 Response:", JSON.stringify(body, null, 2));

                    const { ErrorCode, Message } = body;

                    console.log("📩 Response:", { ErrorCode, Message });
                    expect(ErrorCode).toBe("0");
                    expect(Message).toBe("Success");

                    console.log("✅ Testcase 01 passed — Response hợp lệ!");

               } catch (error) {
                    console.log(`❌ Lỗi khi gửi request: msId: ${smsId}, content: ${content}, serviceId: ${ServiceID}`);
                    throw error;
               }
          }
     });

   
});

