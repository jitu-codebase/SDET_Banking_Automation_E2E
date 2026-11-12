import { ApiOperationExecutor } from "../clients/api-operation-executor";
import { API_ENDPOINTS } from "../api-endpoints";

import {
  getAllCustomerRequestSchema,
  getAllCustomerResponseSchema,
  getAllUserErrorSchema,
  type getAllCustomerRequest,
} from "../schemas/getAll-customers.schema";

export class GetAllCustomerService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async getAllCustomers(payload: getAllCustomerRequest, accessToken: string) {
    const result = await this.apiExecutor.execute({
      method: "GET",
      endpoint: API_ENDPOINTS.CUSTOMERS.GET_ALL,
      payload,
      requestSchema: getAllCustomerRequestSchema,
      successSchema: getAllCustomerResponseSchema,
      errorSchema: getAllUserErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Get customers failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
