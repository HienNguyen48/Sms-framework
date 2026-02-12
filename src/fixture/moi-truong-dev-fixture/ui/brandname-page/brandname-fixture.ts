import { test as base, expect } from '../../../../../src/fixture/moi-truong-dev-fixture/ui/login/login-fixture';
import { BrandnamePage } from 'src/pom/moi-truong-dev/page/cms2018/brandname/brandname.page';

export const test = base.extend<{ vnptSendingAPI: BrandnamePage }>({
    vnptSendingAPI: async ({ request, accessToken }, use) => {
        const brandnamePage = new BrandnamePage(request, accessToken);
        await use(brandnamePage);
    },
});

export { expect };