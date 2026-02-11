import { APIRequestContext } from "@playwright/test";

export class SendOCBHOSendAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40000';
    endPoint: string = '/api/sms';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async SendOCBHOSend(UserId: string, Password: string, ServiceID: string, Message: string, PhoneNumber: string, SMS_ID: string, ContentType: string, Telco: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "UserId": UserId,
                "Password": Password,
                "ServiceID": ServiceID,
                "Message": Message,
                "PhoneNumber": PhoneNumber,
                "SMS_ID": SMS_ID,
                "ContentType": ContentType, 
                "Telco": Telco
            },

        });
        return response;
    }

    async checkPhoneNumber(PhoneNumber: string) {
        switch (true) {
            case PhoneNumber.startsWith("0"):
                console.log(`✅ ${PhoneNumber} hợp lệ (đầu 0)`);
                return "valid_0";

            case PhoneNumber.startsWith("84"):
                console.log(`✅ ${PhoneNumber} hợp lệ (đầu 84)`);
                return "valid_84";

            default:
                console.log(`❌ ${PhoneNumber} không hợp lệ (không bắt đầu bằng 0 hoặc 84)`);
                return "invalid";
        }

    }


}