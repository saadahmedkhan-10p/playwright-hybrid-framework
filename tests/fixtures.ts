// Deprecated fixture file retained empty to avoid import errors if older references remain.
import { test as base } from '@playwright/test';
import { PageManager } from '../utils/web/pageManager';

type Fixtures = {
    pageManager: PageManager;   
}

export const test = base.extend<Fixtures>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});
export { expect } from '@playwright/test';