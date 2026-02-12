import { test as base, expect } from '';
import {test as } from '';

export const test = base.extend<{ vnptSendingAPI: VNPTSendingAPI }>({
    vnptSendingAPI: async ({ request, accessToken }, use) => {
        const vnptSendingAPI = new VNPTSendingAPI(request, accessToken);
        await use(vnptSendingAPI);
    },
});

export { expect };