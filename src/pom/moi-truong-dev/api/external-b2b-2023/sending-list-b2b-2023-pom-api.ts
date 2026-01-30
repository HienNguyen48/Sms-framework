import { APIRequestContext } from "@playwright/test";

export class SendB2B2023SendingListAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40010';
    endPoint: string = '/api/sms';
    access_token: string;

    constructor(request: APIRequestContext, access_token: string) {
        this.request = request;
        this.access_token = access_token;
    }

    async SendB2B2023SendingList(brandname: string, IsCheckDuplicate: string, Priority: string, smsId: string, PhoneNumber: string, Content: string, ContentType: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "SendingList": [
                    {
                        "Brandname": brandname,
                        "IsCheckDuplicate": IsCheckDuplicate,
                        "Priority": Priority,
                        "SmsId": smsId,
                        "PhoneNumber": PhoneNumber,
                        "Content": Content,
                        "ContentType": ContentType
                    },
                ],
            },

        });
        return response;
    }


    async SendB2B2023MultiSendingList(SendingList: any[]) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "SendingList": SendingList,
            },

        });
        return response;
    }

    async checkPhoneNumber(PhoneNumber: string){
        switch(true){
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