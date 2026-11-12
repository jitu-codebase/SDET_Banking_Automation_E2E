// Generated from: src/features/onboarding.feature
import { test } from "../../../../src/fixtures/hybrid.fixture.ts";

test.describe('Personal Details Onboarding', () => {

  test('User completes onboarding successfully', { tag: ['@apiOnboarding'] }, async ({ Given, When, And, adminLoginService, declarationService, financialOnboardingDetailService, onboardingAccountDetailsService, onboardingContactDetailsService, onboardingIdentityService, onboardingPersonalService, registerUserService, scenarioContext, testDataContext }) => { 
    await Given('admin logs in', null, { adminLoginService, scenarioContext, testDataContext }); 
    await When('user do the registration', null, { registerUserService, testDataContext }); 
    await And('user submits personal details', null, { onboardingPersonalService, testDataContext }); 
    await And('user submits contact details', null, { onboardingContactDetailsService, testDataContext }); 
    await And('user submits account details for accountType "savings"', null, { onboardingAccountDetailsService, testDataContext }); 
    await And('user submits identity details', null, { onboardingIdentityService, testDataContext }); 
    await And('user submits source of income as "Salaried"', null, { financialOnboardingDetailService }); 
    await And('user "accept" declaration details', null, { declarationService, testDataContext }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src/features/onboarding.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@apiOnboarding"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given admin logs in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When user do the registration","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And user submits personal details","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And user submits contact details","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user submits account details for accountType \"savings\"","stepMatchArguments":[{"group":{"start":45,"value":"\"savings\"","children":[{"start":46,"value":"savings","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user submits identity details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And user submits source of income as \"Salaried\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Salaried\"","children":[{"start":34,"value":"Salaried","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And user \"accept\" declaration details","stepMatchArguments":[{"group":{"start":5,"value":"\"accept\"","children":[{"start":6,"value":"accept","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end