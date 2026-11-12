import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";
import { API_ENDPOINTS } from "@api-lib/api-endpoints";

import {
  onboardingContactDetailRequestSchema,
  onboardingContactDetailResponseSchema,
  onboardingContactDetailErrorSchema,
  type OnboardingContactDetailRequest,
} from "@api-lib";

export class OnboardingContactDetailsService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async sendContactDetail(
    payload: OnboardingContactDetailRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.CONTACT_DETAIL,
      payload,
      requestSchema: onboardingContactDetailRequestSchema,
      successSchema: onboardingContactDetailResponseSchema,
      errorSchema: onboardingContactDetailErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Contact Detail Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
