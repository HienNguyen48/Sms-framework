import { test as base } from "@playwright/test";
import crypto from "crypto"

export const test = base.extend<{ generateRandomData: () => { smsId: string; content: string; message: string, requestId: string, messageInvalid: string, brandnameIsInvali: string, contentUnicode:string }; }>({
    generateRandomData: async ({ }, use) => {
        await use(() => {
            const randomNumSmsId = crypto.randomInt(10000000000); // random 10 chữ số
            const smsId = `smsIdDev_${randomNumSmsId}`;

            const randomNumContent = crypto.randomInt(100000000);
            const content = `content_${randomNumContent}`;

            const randomNumMessage = crypto.randomInt(10000);
            const message = `message_${randomNumMessage}`;

            const randomNumrequestId = crypto.randomInt(100000);
            const requestId = `requestId_${randomNumrequestId}`;

            const randommessageInvalid = crypto.randomInt(1000);
            const messageInvalid = `requestId_${randommessageInvalid}`;

            const randomContentUnicode = crypto.randomInt(1000);
            const contentUnicode = `ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ_${randomContentUnicode}`;

            const brandnameIsInvalid = crypto.randomInt(1000);
            const brandnameIsInvali = `IRmâmIS_${brandnameIsInvalid}`;

            return { smsId, content, message, requestId, messageInvalid, brandnameIsInvali,contentUnicode };
        });
    },
});

export { expect } from "@playwright/test"