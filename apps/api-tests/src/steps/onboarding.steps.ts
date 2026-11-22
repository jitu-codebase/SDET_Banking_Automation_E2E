import { createBdd } from "playwright-bdd";
import {
  createOnboardingContactDetailsPayload,
  createOnboardingAccountDetailsPayload,
  createOnboardingIdentityPayload,
  createOnboardingFinancialDetailsPayload,
  AccountType,
  createDeclarationPayload,
  createRegisterCustomerPayload,
} from "@api-lib";
import { createPersonalDetailsPayload } from "@api-lib";
import { test, expect } from "../fixtures/hybrid.fixture";
import { DynamicDataHelper, HELPER, logger } from "@core";

const { When, Then } = createBdd(test);

When(
  "user submits personal details",
  async ({ onboardingPersonalService, testDataContext }) => {
    const accessToken = testDataContext.get<string>("adminAccessToken");
    const payload = createPersonalDetailsPayload();
    const response = await onboardingPersonalService.savePersonalDetails(
      payload,
      accessToken,
    );
    testDataContext.set("firstName", payload.firstName);
    testDataContext.set("lastName", payload.lastName);
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data.step).toBe(1);
    expect(result!.data.nextStep).toBe("/onboarding/contact");
    expect(result!.message).toBe("Personal details saved");
  },
);

When(
  "user do the registration",
  async ({ registerUserService, testDataContext }) => {
    const accessToken = testDataContext.get<string>("adminAccessToken");
    const emailId = DynamicDataHelper.generateRandomEmailId();
    testDataContext.set<string>("emailId", emailId);
    const registerCustomerPayload = createRegisterCustomerPayload(emailId);
    const response = await registerUserService.registerUser(
      registerCustomerPayload,
      accessToken,
    );
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    testDataContext.set("registrationCustomerId", result.data.customerId);
  },
);

When(
  "user submits contact details",
  async ({ onboardingContactDetailsService, testDataContext }) => {
    const accessToken = testDataContext.get<string>("adminAccessToken");
    const emailId = testDataContext.get<string>("emailId");
    const contactDetailsPayload =
      createOnboardingContactDetailsPayload(emailId);
    const response = await onboardingContactDetailsService.sendContactDetail(
      contactDetailsPayload,
      accessToken,
    );
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data.step).toBe(2);
  },
);

When(
  "user submits account details for accountType {string}",
  async (
    { onboardingAccountDetailsService, testDataContext },
    accountType: string,
  ) => {
    logger.info(`Account type: ${accountType}`, "STEP");
    const accessToken = testDataContext.get<string>("adminAccessToken");
    const accountDetailsPayload = createOnboardingAccountDetailsPayload(
      accountType as AccountType,
    );
    const response = await onboardingAccountDetailsService.sendAccountDetails(
      accountDetailsPayload,
      accessToken,
    );
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data.step).toBe(3);
  },
);

When(
  "user submits identity details",
  async ({ onboardingIdentityService, testDataContext }) => {
    const accessToken = testDataContext.get<string>("adminAccessToken");
    const identityDetailsPayload = await createOnboardingIdentityPayload();
    const response =
      await onboardingIdentityService.executeOnboardingIdentityDetails(
        identityDetailsPayload,
        accessToken,
      );
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data.step).toBe(4);
  },
);

When(
  "user submits source of income as {string}",
  async ({ financialOnboardingDetailService }, sourceOfIncome: string) => {
    const financialDetailsPayload =
      createOnboardingFinancialDetailsPayload(sourceOfIncome);
    const response =
      await financialOnboardingDetailService.submitFinancialDetails(
        financialDetailsPayload,
      );
    const result = response;
    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data.step).toBe(5);
  },
);

When(
  "user {string} declaration details",
  async (
    { declarationService, testDataContext },
    declarationAccepted: string,
  ) => {
    // 1. Validate input
    expect(
      ["accept", "reject"],
      `Invalid declaration input: "${declarationAccepted}". Expected "accept" or "reject".`,
    ).toContain(declarationAccepted);

    const isAccepted = declarationAccepted === "accept";

    // 2. Fetch access token with clear error
    const accessToken = testDataContext.get<string>("adminAccessToken");

    // 3. Build payload & submit
    const declarationDetailsPayload = createDeclarationPayload(isAccepted);
    const response = await declarationService.submitDeclarationDetails(
      declarationDetailsPayload,
      accessToken,
    );

    // 4. Assert response exists
    expect(
      response,
      "Declaration submission returned no response",
    ).toBeDefined();

    // 5. Assert business success
    expect(response!.success, "Declaration submission was not successful").toBe(
      true,
    );

    // 6. Extract & validate data shape
    expect(
      response!.data,
      "Declaration response missing required data",
    ).toMatchObject({
      customerId: expect.any(String),
      accountNumber: expect.any(String),
      ifscCode: expect.any(String),
    });

    // 7. Store into context
    testDataContext.set("customerID", response!.data.customerId);
    testDataContext.set("accountNumber", response!.data.accountNumber);
    testDataContext.set("ifscCode", response!.data.ifscCode);
  },
);

Then(
  "verify account is available in the customer account list",
  async ({ testDataContext }) => {
    console.log("In test");
    HELPER.verifyCustomerDetailsAfterOnboarding(
      testDataContext.get("Customer_Account_List"),
      testDataContext.get("customerID"),
      testDataContext.get("accountNumber"),
      true,
    );
  },
);

When(
  "I completes full onboarding for accountType {string} with source of income {string} and declaration {string}",
  async (
    {
      onboardingPersonalService,
      registerUserService,
      onboardingContactDetailsService,
      onboardingAccountDetailsService,
      onboardingIdentityService,
      financialOnboardingDetailService,
      declarationService,
      testDataContext,
    },
    accountType: string,
    sourceOfIncome: string,
    declarationAccepted: string,
  ) => {
    // Validate declaration input up-front
    expect(
      ["accept", "reject"],
      `Invalid declaration input: "${declarationAccepted}". Expected "accept" or "reject".`,
    ).toContain(declarationAccepted);

    const accessToken = testDataContext.get<string>("adminAccessToken");

    // ---------------------------------------------------------------
    // Step 0: Registration
    // ---------------------------------------------------------------
    const emailId = DynamicDataHelper.generateRandomEmailId();
    testDataContext.set<string>("emailId", emailId);
    const registerCustomerPayload = createRegisterCustomerPayload(emailId);
    const registerResponse = await registerUserService.registerUser(
      registerCustomerPayload,
      accessToken,
    );
    expect(registerResponse, "Registration returned no response").toBeDefined();
    expect(registerResponse!.success, "Registration was not successful").toBe(
      true,
    );
    testDataContext.set(
      "registrationCustomerId",
      registerResponse.data.customerId,
    );

    // ---------------------------------------------------------------
    // Step 1: Personal details
    // ---------------------------------------------------------------
    const personalPayload = createPersonalDetailsPayload();
    const personalResponse =
      await onboardingPersonalService.savePersonalDetails(
        personalPayload,
        accessToken,
      );
    expect(
      personalResponse,
      "Personal details submission returned no response",
    ).toBeDefined();
    expect(personalResponse!.success).toBe(true);
    expect(personalResponse!.data.step).toBe(1);
    expect(personalResponse!.data.nextStep).toBe("/onboarding/contact");
    expect(personalResponse!.message).toBe("Personal details saved");
    testDataContext.set("firstName", personalPayload.firstName);
    testDataContext.set("lastName", personalPayload.lastName);

    // ---------------------------------------------------------------
    // Step 2: Contact details
    // ---------------------------------------------------------------
    const contactPayload = createOnboardingContactDetailsPayload(emailId);
    const contactResponse =
      await onboardingContactDetailsService.sendContactDetail(
        contactPayload,
        accessToken,
      );
    expect(
      contactResponse,
      "Contact details submission returned no response",
    ).toBeDefined();
    expect(contactResponse!.success).toBe(true);
    expect(contactResponse!.data.step).toBe(2);

    // ---------------------------------------------------------------
    // Step 3: Account details
    // ---------------------------------------------------------------
    logger.info(`Account type: ${accountType}`, "STEP");
    const accountPayload = createOnboardingAccountDetailsPayload(
      accountType as AccountType,
    );
    const accountResponse =
      await onboardingAccountDetailsService.sendAccountDetails(
        accountPayload,
        accessToken,
      );
    expect(
      accountResponse,
      "Account details submission returned no response",
    ).toBeDefined();
    expect(accountResponse!.success).toBe(true);
    expect(accountResponse!.data.step).toBe(3);

    // ---------------------------------------------------------------
    // Step 4: Identity details
    // ---------------------------------------------------------------
    const identityPayload = await createOnboardingIdentityPayload();
    const identityResponse =
      await onboardingIdentityService.executeOnboardingIdentityDetails(
        identityPayload,
        accessToken,
      );
    expect(
      identityResponse,
      "Identity details submission returned no response",
    ).toBeDefined();
    expect(identityResponse!.success).toBe(true);
    expect(identityResponse!.data.step).toBe(4);

    // ---------------------------------------------------------------
    // Step 5: Financial details (source of income)
    // ---------------------------------------------------------------
    const financialPayload =
      createOnboardingFinancialDetailsPayload(sourceOfIncome);
    const financialResponse =
      await financialOnboardingDetailService.submitFinancialDetails(
        financialPayload,
      );
    expect(
      financialResponse,
      "Financial details submission returned no response",
    ).toBeDefined();
    expect(financialResponse!.success).toBe(true);
    expect(financialResponse!.data.step).toBe(5);

    // ---------------------------------------------------------------
    // Step 6: Declaration
    // ---------------------------------------------------------------
    const isAccepted = declarationAccepted === "accept";
    const declarationPayload = createDeclarationPayload(isAccepted);
    const declarationResponse =
      await declarationService.submitDeclarationDetails(
        declarationPayload,
        accessToken,
      );
    expect(
      declarationResponse,
      "Declaration submission returned no response",
    ).toBeDefined();
    expect(
      declarationResponse!.success,
      "Declaration submission was not successful",
    ).toBe(true);
    expect(
      declarationResponse!.data,
      "Declaration response missing required data",
    ).toMatchObject({
      customerId: expect.any(String),
      accountNumber: expect.any(String),
      ifscCode: expect.any(String),
    });

    // Persist final artifacts to context
    testDataContext.set("customerID", declarationResponse!.data.customerId);
    testDataContext.set(
      "accountNumber",
      declarationResponse!.data.accountNumber,
    );
    testDataContext.set("ifscCode", declarationResponse!.data.ifscCode);
  },
);
