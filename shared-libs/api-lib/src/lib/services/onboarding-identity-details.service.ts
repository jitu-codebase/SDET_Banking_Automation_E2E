import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";
import { API_ENDPOINTS } from "@api-lib/api-endpoints";

import {
  OnboardingIdentityErrorSchema,
  type IdentityDetailsServiceRequest,
  OnboardingIdentityRequestSchema,
  OnboardingIdentityResponseSchema,
} from "@api-lib";

export class OnboardingIdentityService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async executeOnboardingIdentityDetails(
    payload: IdentityDetailsServiceRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.IDENTITY_DETAIL,
      payload,
      requestSchema: OnboardingIdentityRequestSchema,
      successSchema: OnboardingIdentityResponseSchema,
      errorSchema: OnboardingIdentityErrorSchema,
      bodyType: "multipart",
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    if (!result.ok) {
      throw new Error(
        `Identity Details Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
