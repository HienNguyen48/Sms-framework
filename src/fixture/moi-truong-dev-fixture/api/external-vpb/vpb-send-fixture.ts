import{ test as base, expect} from '../login/login-fixture';
import { VPBSendingAPI } from '../../../../pom/moi-truong-dev/api/external-vpb/send-vpb-pom-sms-api';

export const test = base.extend<{ vpbSendingAPI: VPBSendingAPI }>({
    vpbSendingAPI: async ({ request, accessToken}, use) => {
        const vpbSendingAPI = new VPBSendingAPI(request, accessToken);
        await use(vpbSendingAPI);
    },
});

export {expect};