import { ApiOperationExecutor } from "../clients/api-operation-executor";
import { API_ENDPOINTS } from "../api-endpoints";

import {
  onboardingPersonalRequestSchema,
  onboardingPersonalResponseSchema,
  onboardingPersonalErrorSchema,
  type OnboardingPersonalRequest,
} from "@api-lib";

export class OnboardingPersonalService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async savePersonalDetails(
    payload: OnboardingPersonalRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.PERSONAL_DETAIL,
      payload,
      requestSchema: onboardingPersonalRequestSchema,
      successSchema: onboardingPersonalResponseSchema,
      errorSchema: onboardingPersonalErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Personal Details Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
