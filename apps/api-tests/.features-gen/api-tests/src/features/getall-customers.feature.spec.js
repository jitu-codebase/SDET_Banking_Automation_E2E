// Generated from: src/features/getall-customers.feature
import { test } from "../../../../src/fixtures/hybrid.fixture.ts";

test.describe('Customer Management', () => {

  test('Admin retrieves customers successfully', { tag: ['@getallcustomers'] }, async ({ When, And, adminLoginService, getAllCustomerService, scenarioContext, testDataContext }) => { 
    await When('admin logs in', null, { adminLoginService, scenarioContext, testDataContext }); 
    await And('admin retrieves customers', null, { getAllCustomerService, scenarioContext, testDataContext }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src/features/getall-customers.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@getallcustomers"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When admin logs in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And admin retrieves customers","stepMatchArguments":[]}]},
]; // bdd-data-end