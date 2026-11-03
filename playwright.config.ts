import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests',use:{baseURL:'http://127.0.0.1:3316',channel:'chrome'},webServer:{command:'node scripts/serve.mjs dist 3316',url:'http://127.0.0.1:3316',reuseExistingServer:true}});
