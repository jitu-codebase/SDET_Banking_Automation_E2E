// Generated from: src/features/onboarding.feature
import { test } from "../../../../../api-tests/src/fixtures/hybrid.fixture.ts";

test.describe('Onboarding', () => {

  test.describe('Customer Onboarding', () => {

    test('Example #1', { tag: ['@uiOnboarding'] }, async ({ Given, When, Then, And, accountDetailPage, contactDetailPage, declarationDetailPage, financialDetailPage, identityDetailPage, landingPage, onboardingSuccessPage, page, personalDetailPage, registerPage, testDataContext }) => { 
      await Given('I launch the url', null, { page }); 
      await When('I click on open account button', null, { landingPage }); 
      await And('I fill the email address', null, { registerPage, testDataContext }); 
      await And('I fill the personal details', null, { personalDetailPage, testDataContext }); 
      await And('I fill the contact details', null, { contactDetailPage, testDataContext }); 
      await And('I fill account details for accountType "Savings Account"', null, { accountDetailPage, testDataContext }); 
      await And('I fill identity details', null, { identityDetailPage, testDataContext }); 
      await And('I select source of income as "Salaried"', null, { financialDetailPage }); 
      await And('I accept declaration', null, { declarationDetailPage }); 
      await Then('I verify account is created successfully', null, { onboardingSuccessPage, testDataContext }); 
    });

    test('Example #2', { tag: ['@uiOnboarding'] }, async ({ Given, When, Then, And, accountDetailPage, contactDetailPage, declarationDetailPage, financialDetailPage, identityDetailPage, landingPage, onboardingSuccessPage, page, personalDetailPage, registerPage, testDataContext }) => { 
      await Given('I launch the url', null, { page }); 
      await When('I click on open account button', null, { landingPage }); 
      await And('I fill the email address', null, { registerPage, testDataContext }); 
      await And('I fill the personal details', null, { personalDetailPage, testDataContext }); 
      await And('I fill the contact details', null, { contactDetailPage, testDataContext }); 
      await And('I fill account details for accountType "Savings Account"', null, { accountDetailPage, testDataContext }); 
      await And('I fill identity details', null, { identityDetailPage, testDataContext }); 
      await And('I select source of income as "Salaried"', null, { financialDetailPage }); 
      await And('I accept declaration', null, { declarationDetailPage }); 
      await Then('I verify account is created successfully', null, { onboardingSuccessPage, testDataContext }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src/features/onboarding.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":19,"tags":["@uiOnboarding"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I launch the url","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I click on open account button","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And I fill the email address","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I fill the personal details","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I fill the contact details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I fill account details for accountType \"Savings Account\"","stepMatchArguments":[{"group":{"start":39,"value":"\"Savings Account\"","children":[{"start":40,"value":"Savings Account","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I fill identity details","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I select source of income as \"Salaried\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Salaried\"","children":[{"start":30,"value":"Salaried","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I accept declaration","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I verify account is created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":20,"tags":["@uiOnboarding"],"steps":[{"pwStepLine":22,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I launch the url","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I click on open account button","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And I fill the email address","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I fill the personal details","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I fill the contact details","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I fill account details for accountType \"Savings Account\"","stepMatchArguments":[{"group":{"start":39,"value":"\"Savings Account\"","children":[{"start":40,"value":"Savings Account","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I fill identity details","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I select source of income as \"Salaried\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Salaried\"","children":[{"start":30,"value":"Salaried","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I accept declaration","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I verify account is created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end