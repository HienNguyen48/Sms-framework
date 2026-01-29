import { test as base, expect } from '@playwright/test';
import { LoginAPITest } from '../../../../pom/moi-truong-dev/api/login-sms-iris/login-pom-iris-api';


type LoginFixture = {
    loginAPI: LoginAPITest;
    accessToken: string;

};

//Khởi tạo class login
export const test = base.extend<LoginFixture>({
    loginAPI: async ({ request }, use) => {
        const loginAPI = new LoginAPITest(request);
        await use(loginAPI);

    },

    //Gọi login & lấy token
    accessToken: async ({ loginAPI }, use) => {
        const response = await loginAPI.UserLoginMTTest('password', 'iris', 'iris@123');
        const json = await response.json();
        //1 số api trả về toke & 1 số trả về access_token
        const token = json?.access_token || json?.token;

        if (!token) {
            throw new Error('❌ Không lấy được token khi đăng nhập');
        }

        await use(token);
    },
});

export { expect } from '@playwright/test';