import { test as base, expect } from '../login/login-fixture';
import { NamABankSendingListAPI } from '../../../../pom/moi-truong-dev/api/external-nam-a-bank/nam-a-bank-sending-list-pom-sms-api';

export const test = base.extend<{ namABankSendingListAPI: NamABankSendingListAPI }>({
    namABankSendingListAPI: async ({ request, accessToken }, use) => {
        const namABankSendingListAPI = new NamABankSendingListAPI(request, accessToken);
        await use(namABankSendingListAPI);
    },
});

export { expect };