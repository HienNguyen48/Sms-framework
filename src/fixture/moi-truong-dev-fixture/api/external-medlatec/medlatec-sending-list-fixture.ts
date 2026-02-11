import{ test as base, expect} from '../login/login-fixture';
import { SendMedlatecSendingListAPI } from '../../../../pom/moi-truong-dev/api/external-medlatec/send-medlatec-pom-api';

export const test = base.extend<{ sendMedlatecSendingListAPI: SendMedlatecSendingListAPI}>({
    sendMedlatecSendingListAPI: async ({request, accessToken}, use) => {
        const sendMedlatecSendingListAPI = new SendMedlatecSendingListAPI(request,accessToken);
        await use(sendMedlatecSendingListAPI);
    },
});

export {expect};