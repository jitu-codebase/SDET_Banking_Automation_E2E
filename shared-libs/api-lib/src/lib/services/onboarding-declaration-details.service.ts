import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";
import { API_ENDPOINTS } from "@api-lib/api-endpoints";

import {
  DeclarationServiceRequestSchema,
  DeclarationServiceResponseSchema,
  DeclarationServiceErrorSchema,
  type DeclarationServiceRequest,
} from "@api-lib";

export class DeclarationService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}
  async submitDeclarationDetails(
    payload: DeclarationServiceRequest,
    accessToken: string,
  ) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.DECLARATION,
      payload,
      requestSchema: DeclarationServiceRequestSchema,
      successSchema: DeclarationServiceResponseSchema,
      errorSchema: DeclarationServiceErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    if (!result.ok) {
      throw new Error(
        `Declaration Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
