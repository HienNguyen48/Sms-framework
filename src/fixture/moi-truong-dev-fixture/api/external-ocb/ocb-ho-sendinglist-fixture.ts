import {test as base} from '@playwright/test';
import { SendOCBHOSendingListAPI } from '../../../../pom/moi-truong-dev/api/external-ocb/sending-list-ocb-ho-dev-pom-sms-api';


export const test = base.extend<{ sendOCBHOSendingListAPI: SendOCBHOSendingListAPI; }>({
    sendOCBHOSendingListAPI: async ({ request}, use) => {
        const sendOCBHOSendingListAPI = new SendOCBHOSendingListAPI(request);
        await use(sendOCBHOSendingListAPI);
    },
});

export { expect} from"@playwright/test"