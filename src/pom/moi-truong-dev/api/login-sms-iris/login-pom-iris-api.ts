import { APIRequestContext } from "@playwright/test";

export class LoginAPITest {
    request: APIRequestContext;
    baseURL: string = 'http://192.168.1.9:40010';
    enPoint: string = '/oauth2/token';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async UserLoginMTTest(grant_type: string, username: string, password: string) {
        const url: string = `${this.baseURL}${this.enPoint}`
        const response = await this.request.post(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
            },
            form: {
                grant_type: grant_type ,
                username: username,
                password: password 
            },

        });
        return response;
    };
};