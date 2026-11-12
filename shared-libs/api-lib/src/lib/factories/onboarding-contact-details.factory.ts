import { DynamicDataHelper } from "@core";
import { OnboardingContactDetailRequest } from "@api-lib/schemas/onboarding-contact-details.schema";

export const createOnboardingContactDetailsPayload = (
  emailId: string,
): OnboardingContactDetailRequest => {
  return {
    email: emailId,
    mobile: "8169075328",
  };
};
