import { mergeTests, test as base, expect } from "@playwright/test";
import { test as loginui } from "./login/login-fixture";

export class CommonFixtureUI {
}

// const UIFixture = base.extend<{ commonFixtureUI: CommonFixtureUI }>({
//     commonFixtureUI: async ({ }, use) => {
//         await use(new CommonFixtureUI());
//     }
// })
export const test = mergeTests(
    loginui,

);

export { expect };