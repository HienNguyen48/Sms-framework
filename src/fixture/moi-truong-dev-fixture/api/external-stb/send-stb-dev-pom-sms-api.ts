import { test as base, expect } from '../login/login-fixture';
import { SendSTBSendingAPI } from '../../../../pom/moi-truong-dev/api/external-stb/send-stb-dev-pom-sms-api';

export const test = base.extend<{ sendSTBSendingAPI: SendSTBSendingAPI}>({
    sendSTBSendingAPI: async ({request, accessToken}, use) => {
        const sendSTBSendingAPI = new SendSTBSendingAPI(request,accessToken);
        await use(sendSTBSendingAPI);
    },
});

export {expect};