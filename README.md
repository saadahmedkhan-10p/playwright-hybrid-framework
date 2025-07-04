#Run Playwright Web Tests
npx playwright test tests/web/user.web.spec.ts --project=chromium   

#Generate  Allure report
allure serve allure-results  

#Mobile Execution headed
npx playwright test --project="Mobile Chrome" --headed

#Api Execution
npx playwright test --project="Api Tests"

#Web execution on multiple browsers
npx playwright test tests/web/user.web.spec.ts --project="chromium" --project="firefox"
