import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";
import { API_ENDPOINTS } from "@api-lib/api-endpoints";

import {
  type OnboardingAccountDetailsRequest,
  onboardingAccountDetailsRequestSchema,
  onboardingAccountDetailsResponseSchema,
  onboardingAccountDetailsErrorSchema,
} from "@api-lib/schemas/onboarding-account-details.schema";

export class OnboardingAccountDetailsService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async sendAccountDetails(
    payload: OnboardingAccountDetailsRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.ACCOUNT_DETAIL,
      payload,
      requestSchema: onboardingAccountDetailsRequestSchema,
      successSchema: onboardingAccountDetailsResponseSchema,
      errorSchema: onboardingAccountDetailsErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Account Detail Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
