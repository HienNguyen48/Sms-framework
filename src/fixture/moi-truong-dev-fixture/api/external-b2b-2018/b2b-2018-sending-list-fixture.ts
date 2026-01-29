import { test as base, expect} from "../login/login-fixture";
import { SendB2B2018SendingListAPI } from "../../../../pom/moi-truong-dev/api/external-b2b-2018/sending-list-b2b-2018-pom-api";

export const test = base.extend<{ sendB2B2018SendingListAPI: SendB2B2018SendingListAPI }>({
    sendB2B2018SendingListAPI: async ({ request, accessToken }, use) => {
        const sendB2B2018SendingListAPI = new SendB2B2018SendingListAPI(request, accessToken);
        await use(sendB2B2018SendingListAPI);
    },
});

export { expect };