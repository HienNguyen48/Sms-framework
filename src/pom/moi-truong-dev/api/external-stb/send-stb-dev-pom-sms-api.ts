import { APIRequestContext } from "@playwright/test";

export class SendSTBSendingAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40015';
    endPoint: string = '/api/sms';
    access_token: string;

    constructor(request: APIRequestContext, access_token: string) {
        this.request = request;
        this.access_token = access_token;
    }

    async STBSending(ServiceID: string, SMS_ID: string, PhoneNumber: string, Message: string, ContentType: string, UserId: string, Password: string, Priority: string, Telco: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "ServiceID": ServiceID,
                "SMS_ID": SMS_ID,
                "PhoneNumber": PhoneNumber,
                "Message": Message,
                "ContentType": ContentType,
                "UserId": UserId,
                "Password": Password,
                "Priority": Priority,
                "Telco": Telco
            }
        })
        return response;
    }


    async STBMultiSending(successSmsType2: any) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: successSmsType2,

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