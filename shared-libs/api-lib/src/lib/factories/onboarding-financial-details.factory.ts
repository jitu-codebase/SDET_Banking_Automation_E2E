import { FinancialDetailsServiceRequest } from "@api-lib";

export const createOnboardingFinancialDetailsPayload = (
  sourceOfIncome: string,
): FinancialDetailsServiceRequest => {
  return {
    sourceOfIncome: sourceOfIncome,
  };
};
