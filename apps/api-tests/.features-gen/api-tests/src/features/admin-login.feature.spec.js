// Generated from: src/features/admin-login.feature
import { test } from "../../../../src/fixtures/hybrid.fixture.ts";

test.describe('Admin Login', () => {

  test('Admin logs in with valid credentials', async ({ When, Then, adminLoginService, scenarioContext, testDataContext }) => { 
    await When('admin logs in', null, { adminLoginService, scenarioContext, testDataContext }); 
    await Then('the login should be successful', null, { scenarioContext }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src/features/admin-login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When admin logs in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then the login should be successful","stepMatchArguments":[]}]},
]; // bdd-data-end