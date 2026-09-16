import { test as base } from '@playwright/test';
import { PageManager } from '../utils/web/pageManager';
import { APIUtils } from '../utils/api/APIUtils';

type Fixtures = {
    pageManager: PageManager;
    apiClient: APIUtils;
}

export const test = base.extend<Fixtures>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
    apiClient: async ({}, use) => {
        const baseURL = process.env.API_URL;
        if (!baseURL) {
            throw new Error('API_URL is required to initialize the API client');
        }

        const apiClient = new APIUtils();
        await apiClient.init(baseURL, process.env.X_API_KEY);
        await use(apiClient);
        await apiClient.dispose();
    },
});
export { expect } from '@playwright/test';