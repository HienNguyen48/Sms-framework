import { test as base, request} from '@playwright/test';
import { SendOCBHOSendAPI } from '../../../../pom/moi-truong-dev/api/external-ocb/send-ocb-ho-dev-pom-sms-api';

export const test = base.extend<{ sendOCBHOSendAPI: SendOCBHOSendAPI; }>({
    sendOCBHOSendAPI: async ({ request}, use) =>  {
        const sendOCBHOSendAPI = new SendOCBHOSendAPI(request);
        await use(sendOCBHOSendAPI);
    },
})
 export { expect} from '@playwright/test'