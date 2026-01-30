import { test as base, expect} from '../login/login-fixture';
import { SendB2B2023SendAPI} from '../../../../pom/moi-truong-dev/api/external-b2b-2023/send-b2b-2023-pom-api';
import { request } from 'http';
import { access } from 'fs';

export const test = base.extend<{ sendB2B2023SendAPI: SendB2B2023SendAPI}>({
    sendB2B2023SendAPI: async ({request, accessToken}, use) => {
        const sendB2B2023SendAPI = new SendB2B2023SendAPI(request,accessToken);
        await use(sendB2B2023SendAPI);
    },
});

export {expect};