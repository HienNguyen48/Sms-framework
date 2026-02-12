import { APIRequestContext } from "@playwright/test";

export class XanhPonSendingListAPI {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40009';
    endPoint: string = '/api/sms';
    access_token: string;

    constructor(request: APIRequestContext, access_token: string) {
        this.request = request;
        this.access_token = access_token;
    }
    async XanhPonSendingList(Brandname: string, IsCheckDuplicate: string, SmsId: string, PhoneNumber: string, TemplateId: string, TemplateData: string, P1: string, P2: string, P3: string, P4: string, P5: string, Telco: string) {
        const url: string = `${this.baseURL}${this.endPoint}`
        const response = await this.request.post(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "SendingList": [
                    {
                        "Brandname": Brandname,
                        "IsCheckDuplicate": IsCheckDuplicate,
                        "SmsId": SmsId,
                        "PhoneNumber": PhoneNumber,
                        "TemplateId": TemplateId,
                        "TemplateData": {
                            "P1": P1,
                            "P2": P2,
                            "P3": P3,
                            "P4": P4,
                            "P5": P5
                        }
                    },
                ]
        }
    })
        return response;
    }


    async XanhPonMultiSendingList(SendingList: any[]) {
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