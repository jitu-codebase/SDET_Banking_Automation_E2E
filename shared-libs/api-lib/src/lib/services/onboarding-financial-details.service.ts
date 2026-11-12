import { API_ENDPOINTS } from "@api-lib/api-endpoints";
import { ApiOperationExecutor } from "@api-lib/clients/api-operation-executor";

import {
  FinancialDetailsServiceRequestSchema,
  FinancialDetailsServiceResponseSchema,
  type FinancialDetailsServiceRequest,
  FinancialDetailsServiceErrorSchema,
} from "@api-lib";

export class FinancialOnboardingDetailService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async submitFinancialDetails(payload: FinancialDetailsServiceRequest) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.ONBOARDING.FINANCIAL_DETAIL,
      payload,
      requestSchema: FinancialDetailsServiceRequestSchema,
      successSchema: FinancialDetailsServiceResponseSchema,
      errorSchema: FinancialDetailsServiceErrorSchema,
    });
    if (!result.ok) {
      throw new Error(
        `Financial Detail Service failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
