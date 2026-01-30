import { APIRequestContext } from "@playwright/test";

export class SendB2B2023SendAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40010';
    endPoint: string = '/api/sms/send';
    access_token: string;

    constructor(request: APIRequestContext, access_token: string) {
        this.request = request;
        this.access_token = access_token;
    }

    async SendB2B2023Sending(IsCheckDuplicate: string, smsId: string, PhoneNumber: string, content: string, ContentType: string, Telco: string, SendTime: string, Brandname: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "IsCheckDuplicate": IsCheckDuplicate,
                "SmsId": smsId,
                "PhoneNumber": PhoneNumber,
                "Content": content,
                "ContentType": ContentType,
                "Telco": Telco,
                "sendTime": SendTime,
                "Brandname": Brandname
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