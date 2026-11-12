import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";
import { API_ENDPOINTS } from "@api-lib/api-endpoints";

import {
  RegisterCustomerServiceRequestSchema,
  RegisterCustomerServiceResponseSchema,
  onboardingRegisterUserErrorSchema,
  type RegisterCustomerServiceRequest,
} from "@api-lib";

export class RegisterUserService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async registerUser(
    payload: RegisterCustomerServiceRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.REGISTER_USER,
      payload,
      requestSchema: RegisterCustomerServiceRequestSchema,
      successSchema: RegisterCustomerServiceResponseSchema,
      errorSchema: onboardingRegisterUserErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Register User Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
