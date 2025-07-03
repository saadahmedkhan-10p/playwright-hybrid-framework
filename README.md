#Run Playwright Web Tests
npx playwright test tests/web/web.spec.ts --project=chromium   

#Generate  Allure report
allure serve allure-results  
