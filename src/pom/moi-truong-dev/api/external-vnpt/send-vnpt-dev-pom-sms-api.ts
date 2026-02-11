import { APIRequestContext } from "@playwright/test";

export class VNPTSendingAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40016';
    endPoint: string = '/api/sms/send';
    access_token: string;

    constructor(request: APIRequestContext, access_token: string) {
        this.request = request;
        this.access_token = access_token;
    }

    async VNPTSending(requestId: string, username: string, password: string, brandname: string, contractType: string, message: string, sendTime: string, msisdnList: string, isUnicode: string, encrypted: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "requestId": requestId,
                "username": username,
                "password": password,
                "brandname": brandname,
                "contractType": contractType,
                "message": message,
                "sendTime": sendTime,
                "msisdnList": msisdnList,
                "isUnicode": isUnicode,
                "encrypted": encrypted
            }
        })
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