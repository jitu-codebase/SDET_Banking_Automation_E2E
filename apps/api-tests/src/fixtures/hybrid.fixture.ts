import { test as base } from "playwright-bdd";
import { expect, request as playwrightRequest } from "@playwright/test";
import { config } from "@config/environment";
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
  DeleteCustomerRecordService,
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
  LoginPage,
  DashboardPage,
  AutomationPracticePage,
  JsalertComponents,
} from "@ui-lib";
import { maskSensitiveData, logger } from "@core";
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
  adminApiClient: ApiClient;
  adminApiOperationExecutor: ApiOperationExecutor;
  deleteCustomerRecordService: DeleteCustomerRecordService;

  landingPage: LandingPage;
  registerPage: RegisterPage;
  personalDetailPage: PersonalDetailPage;
  contactDetailPage: ContactDetailPage;
  accountDetailPage: AccountDetailPage;
  identityDetailPage: IdentityDetailPage;
  financialDetailPage: FinancialDetailPage;
  declarationDetailPage: DeclarationDetailPage;
  onboardingSuccessPage: OnboardingSuccessPage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  automationPracticePage: AutomationPracticePage;
  jsalertComponents: JsalertComponents;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  },

  adminApiClient: async ({}, use) => {
    const adminRequestContext = await playwrightRequest.newContext({
      baseURL: config.BASE_URL,
    });

    try {
      const apiClient = new ApiClient(adminRequestContext);
      await use(apiClient);
    } finally {
      await adminRequestContext.dispose();
    }
  },

  adminApiOperationExecutor: async ({ adminApiClient }, use) => {
    const executor = new ApiOperationExecutor(adminApiClient);
    await use(executor);
  },

  apiOperationExecutor: async ({ apiClient }, use) => {
    const executor = new ApiOperationExecutor(apiClient);
    await use(executor);
  },

  adminLoginService: async ({ adminApiOperationExecutor }, use) => {
    const service = new AdminLoginService(adminApiOperationExecutor);
    await use(service);
  },

  scenarioContext: async ({}, use) => {
    await use({});
  },
  testDataContext: async ({}, use) => {
    const dataContext = new TestDataContext();
    await use(dataContext);
    logger.section("TEST DATA CONTEXT", "FIXTURE");
    logger.logPayload(
      "Scenario Data",
      maskSensitiveData(dataContext.getAll()),
      "FIXTURE",
    );
    dataContext.clear();
  },
  getAllCustomerService: async ({ adminApiOperationExecutor }, use) => {
    const service = new GetAllCustomerService(adminApiOperationExecutor);
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
  deleteCustomerRecordService: async ({ adminApiOperationExecutor }, use) => {
    const service = new DeleteCustomerRecordService(adminApiOperationExecutor);
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
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  automationPracticePage: async ({ page }, use) => {
    const automationPracticePage = new AutomationPracticePage(page);
    await use(automationPracticePage);
  },

  jsalertComponents: async ({ page }, use) => {
    const jsalertComponents = new JsalertComponents(page);
    await use(jsalertComponents);
  },
});

export { expect };
