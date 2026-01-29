/// <reference types="@playwright/test" />

import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'always' }],
  ],

  use: {
    trace: 'on',
    video: { mode: 'on', size: { width: 1000, height: 1000 } },
    screenshot: 'only-on-failure',
    baseURL: 'http://192.168.1.9:40101',
  },

  projects: [
    // {
    //   name: 'ui-firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     headless: isCI, // local có UI, CI headless
    //   },
    // },
    {
      name: 'api',
      use: {
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
  ],
});