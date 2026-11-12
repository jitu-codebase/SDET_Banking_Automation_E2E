import { test as base } from "playwright-bdd";
import { expect } from "@playwright/test";
import { TestDataContext } from "@core";
import {
  ApiClient,
  ApiOperationExecutor,
  AdminLoginService,
  GetAllCustomerService,
  OnboardingPersonalService,
  OnboardingContactDetailsService,
  OnboardingAccountDetailsService,
  OnboardingIdentityService,
  FinancialOnboardingDetailService,
  DeclarationService,
  RegisterUserService,
} from "@api-lib";
import type { AdminLoginResponse, getAllCustomerResponse } from "@api-lib";

import {
  LandingPage,
  RegisterPage,
  PersonalDetailPage,
  ContactDetailPage,
  AccountDetailPage,
  IdentityDetailPage,
  FinancialDetailPage,
  DeclarationDetailPage,
  OnboardingSuccessPage,
} from "@ui-lib";
import { maskSensitiveData } from "@core";
// Data shared between steps within one scenario
type ScenarioContext = {
  loginResult?: AdminLoginResponse;
  customerResult?: getAllCustomerResponse;
};

type ApiFixtures = {
  apiClient: ApiClient;
  apiOperationExecutor: ApiOperationExecutor;
  adminLoginService: AdminLoginService;
  scenarioContext: ScenarioContext;
  testDataContext: TestDataContext;
  getAllCustomerService: GetAllCustomerService;
  onboardingPersonalService: OnboardingPersonalService;
  onboardingContactDetailsService: OnboardingContactDetailsService;
  onboardingAccountDetailsService: OnboardingAccountDetailsService;
  onboardingIdentityService: OnboardingIdentityService;
  financialOnboardingDetailService: FinancialOnboardingDetailService;
  declarationService: DeclarationService;
  registerUserService: RegisterUserService;

  landingPage: LandingPage;
  registerPage: RegisterPage;
  personalDetailPage: PersonalDetailPage;
  contactDetailPage: ContactDetailPage;
  accountDetailPage: AccountDetailPage;
  identityDetailPage: IdentityDetailPage;
  financialDetailPage: FinancialDetailPage;
  declarationDetailPage: DeclarationDetailPage;
  onboardingSuccessPage: OnboardingSuccessPage;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  },

  apiOperationExecutor: async ({ apiClient }, use) => {
    const executor = new ApiOperationExecutor(apiClient);
    await use(executor);
  },

  adminLoginService: async ({ apiOperationExecutor }, use) => {
    const service = new AdminLoginService(apiOperationExecutor);
    await use(service);
  },

  scenarioContext: async ({}, use) => {
    await use({});
  },
  testDataContext: async ({}, use) => {
    const dataContext = new TestDataContext();
    await use(dataContext);
    console.log("\n========== TEST DATA CONTEXT ==========");
    console.log(
      JSON.stringify(maskSensitiveData(dataContext.getAll()), null, 2),
    );
    console.log("=======================================\n");
    dataContext.clear();
  },
  getAllCustomerService: async ({ apiOperationExecutor }, use) => {
    const service = new GetAllCustomerService(apiOperationExecutor);
    await use(service);
  },
  onboardingPersonalService: async ({ apiOperationExecutor }, use) => {
    const service = new OnboardingPersonalService(apiOperationExecutor);
    await use(service);
  },
  onboardingContactDetailsService: async ({ apiOperationExecutor }, use) => {
    const service = new OnboardingContactDetailsService(apiOperationExecutor);
    await use(service);
  },
  onboardingAccountDetailsService: async ({ apiOperationExecutor }, use) => {
    const service = new OnboardingAccountDetailsService(apiOperationExecutor);
    await use(service);
  },
  onboardingIdentityService: async ({ apiOperationExecutor }, use) => {
    const service = new OnboardingIdentityService(apiOperationExecutor);
    await use(service);
  },
  financialOnboardingDetailService: async ({ apiOperationExecutor }, use) => {
    const service = new FinancialOnboardingDetailService(apiOperationExecutor);
    await use(service);
  },
  declarationService: async ({ apiOperationExecutor }, use) => {
    const service = new DeclarationService(apiOperationExecutor);
    await use(service);
  },
  registerUserService: async ({ apiOperationExecutor }, use) => {
    const service = new RegisterUserService(apiOperationExecutor);
    await use(service);
  },

  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  personalDetailPage: async ({ page }, use) => {
    const personalDetailPage = new PersonalDetailPage(page);
    await use(personalDetailPage);
  },
  contactDetailPage: async ({ page }, use) => {
    const contactDetailPage = new ContactDetailPage(page);
    await use(contactDetailPage);
  },
  accountDetailPage: async ({ page }, use) => {
    const accountDetailPage = new AccountDetailPage(page);
    await use(accountDetailPage);
  },
  identityDetailPage: async ({ page }, use) => {
    const identityDetailPage = new IdentityDetailPage(page);
    await use(identityDetailPage);
  },
  financialDetailPage: async ({ page }, use) => {
    const financialDetailPage = new FinancialDetailPage(page);
    await use(financialDetailPage);
  },
  declarationDetailPage: async ({ page }, use) => {
    const declarationDetailPage = new DeclarationDetailPage(page);
    await use(declarationDetailPage);
  },
  onboardingSuccessPage: async ({ page }, use) => {
    const onboardingSuccessPage = new OnboardingSuccessPage(page);
    await use(onboardingSuccessPage);
  },
});

export { expect };
