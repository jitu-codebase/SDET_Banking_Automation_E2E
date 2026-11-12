import { DynamicDataHelper } from "@core";
import { OnboardingAccountDetailsRequest } from "../schemas/onboarding-account-details.schema";
import { config } from "@config/environment";
export type AccountType = "savings" | "current";

export const createOnboardingAccountDetailsPayload = (
  accountType: AccountType,
): OnboardingAccountDetailsRequest => {
  return {
    username: DynamicDataHelper.generateRandomUsername(),
    password: config.DEMO_PASSWORD,
    accountType: accountType.toLowerCase(),
  };
};
