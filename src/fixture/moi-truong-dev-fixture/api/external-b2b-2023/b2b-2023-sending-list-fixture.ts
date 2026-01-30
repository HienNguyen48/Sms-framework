import { SendB2B2023SendingListAPI} from '../../../../pom/moi-truong-dev/api/external-b2b-2023/sending-list-b2b-2023-pom-api';
import { test as base, expect} from '../login/login-fixture';

export const test = base.extend<{ sendB2B2023SendingListAPI: SendB2B2023SendingListAPI}>({
    sendB2B2023SendingListAPI: async ({request, accessToken}, use) => {
        const sendB2B2023SendAPI = new SendB2B2023SendingListAPI(request,accessToken);
        await use(sendB2B2023SendAPI);
    },
});

export {expect};