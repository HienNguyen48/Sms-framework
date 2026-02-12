import{ test as base, expect} from '../login/login-fixture';
import { XanhPonSendingListAPI } from '../../../../pom/moi-truong-dev/api/external-xanhpon/sending-list-xanh-pon-pom-sms-iris-api';

export const test = base.extend<{ xanhPonSendingListAPI: XanhPonSendingListAPI}>({
    xanhPonSendingListAPI: async ({request, accessToken}, use) => {
        const xanhPonSendingListAPI = new XanhPonSendingListAPI(request,accessToken);
        await use(xanhPonSendingListAPI);
    },
});

export {expect};