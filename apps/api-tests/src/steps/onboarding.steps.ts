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
import { DynamicDataHelper } from "@core";

const { When } = createBdd(test);

When(
  "user submits personal details",
  async ({ onboardingPersonalService, testDataContext }) => {
    const accessToken = testDataContext.get<string>("accessToken");
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
    const accessToken = testDataContext.get<string>("accessToken");
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
    const accessToken = testDataContext.get<string>("accessToken");
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
    console.log("Account type is: " + accountType);
    const accessToken = testDataContext.get<string>("accessToken");
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
    const accessToken = testDataContext.get<string>("accessToken");
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
    const accessToken = testDataContext.get<string>("accessToken");

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
