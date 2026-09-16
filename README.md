# Hybrid Framework Playwright

Playwright automation for Sauce Demo web and mobile-web flows, plus Reqres API coverage.

## Setup

```powershell
npm ci
Copy-Item .env.example .env
npx playwright install
```

Set the real values in `.env`:

- `BASE_URL`: web application URL
- `API_URL`: API base URL
- `X_API_KEY`: optional API key used by `APIUtils` when the service requires it

## Architecture

- `pages/`: page objects and shared page behavior
- `utils/web/`: browser-specific page management and test data
- `utils/api/`: API client and API test data
- `tests/fixtures.ts`: shared `pageManager` and `apiClient` fixtures
- `tests/global.setup.ts`: creates the authenticated browser storage state
- `tests/web/`: desktop browser tests
- `tests/mobile/`: mobile-web tests using the Pixel 5 browser profile
- `tests/api/`: API tests

The Pixel 5 project is responsive mobile-web testing. It is not native Android or iOS automation through Appium.

## Run tests

```powershell
npm run test:web
npm run test:mobile
npm run test:api
npm run test:smoke
npm run test:all
```

Run a specific project or list its tests:

```powershell
npx playwright test --project=chromium
npx playwright test --list --project=webkit
```

Smoke tests use the `@smoke` tag and run against Chromium with `npm run test:smoke`.

## Adding tests

Use the file suffix for the intended project:

- `.web.spec.ts` for desktop web tests
- `.mobile.spec.ts` for mobile-web tests
- `.api.spec.ts` for API tests

Import `test` and `expect` from `tests/fixtures.ts`. Use `pageManager` for page objects and `apiClient` for API requests. Browser tests should rely on the authenticated storage state unless the test specifically covers login.

## Allure reports

```powershell
npm run allure:generate
npm run allure:open
```

CI uploads Allure results and the generated report even when tests fail. Deployment is allowed only when the test job succeeds.
