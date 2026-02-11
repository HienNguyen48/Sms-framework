import { APIRequestContext } from "@playwright/test";

export class SendOCBHOSendingListAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40000';
    endPoint: string = '/api/sms/SendList';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async SendOCBHOSendingList(UserId: string, Password: string, SendingList: any[]) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "UserId": UserId,
                "Password": Password,
                "SendingList": SendingList
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