import { test as base, expect } from '../login/login-fixture';
import { VNPTSendingAPI } from '../../../../pom/moi-truong-dev/api/external-vnpt/send-vnpt-dev-pom-sms-api';

export const test = base.extend<{ vnptSendingAPI: VNPTSendingAPI }>({
    vnptSendingAPI: async ({ request, accessToken }, use) => {
        const vnptSendingAPI = new VNPTSendingAPI(request, accessToken);
        await use(vnptSendingAPI);
    },
});

export { expect };