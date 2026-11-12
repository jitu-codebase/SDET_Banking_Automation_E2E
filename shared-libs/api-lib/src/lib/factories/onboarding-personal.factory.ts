import { faker } from "@faker-js/faker";
import type { OnboardingPersonalRequest } from "../schemas/onboarding-personal.schema";
import { DynamicDataHelper } from "@core";

export const createPersonalDetailsPayload = (
  overrides: Partial<OnboardingPersonalRequest> = {},
): OnboardingPersonalRequest => {
  return {
    firstName: DynamicDataHelper.generateRandomFirstName(),
    lastName: DynamicDataHelper.generateRandomLastName(),
    dateOfBirth: DynamicDataHelper.generateRandomDOB(),
    address: DynamicDataHelper.generateRandomAddress(),
    ...overrides,
  };
};
