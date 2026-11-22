import { ApiOperationExecutor } from "../clients/api-operation-executor";
import { API_ENDPOINTS } from "../api-endpoints";

import {
  deleteCustomerRecordRequestSchema,
  deleteCustomerRecordResponseSchema,
  deleteCustomerRecordResponseErrorSchema,
  type deleteCustomerRecordRequest,
} from "../schemas/delete-customers-records.schema";

export class DeleteCustomerRecordService {
  constructor(private readonly api_executor: ApiOperationExecutor) {}

  async deleteCustomerRecord(
    payload: deleteCustomerRecordRequest,
    accessToken: string,
    _id: string,
  ) {
    const result = await this.api_executor.execute({
      method: "DELETE",
      endpoint: API_ENDPOINTS.CUSTOMERS.DELETE_RECORD.replace(
        "{customerId}",
        _id,
      ),
      payload,
      requestSchema: deleteCustomerRecordRequestSchema,
      successSchema: deleteCustomerRecordResponseSchema,
      errorSchema: deleteCustomerRecordResponseErrorSchema,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!result.ok) {
      throw new Error(
        `Delete customer records failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
