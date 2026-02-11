import{ test as base, expect} from '../../api/login/login-fixture';
import { SendMBSendingListAPI } from '../../../../pom/moi-truong-dev/api/external-mbbank/sending-list-mb-pom-sms-api';

export const test = base.extend<{ sendMBSendingListAPI: SendMBSendingListAPI}>({
    sendMBSendingListAPI: async ({request, accessToken}, use) => {
        const sendMBSendingListAPI = new SendMBSendingListAPI(request,accessToken);
        await use(sendMBSendingListAPI);
    },
});

export {expect};