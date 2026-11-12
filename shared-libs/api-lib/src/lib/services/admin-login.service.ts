import { ApiOperationExecutor } from "../clients/api-operation-executor";
import { API_ENDPOINTS } from "../api-endpoints";

import {
  adminLoginRequestSchema,
  adminLoginResponseSchema,
  adminLoginErrorResponseSchema,
  type AdminLoginRequest,
} from "../schemas/admin-login.schema";

export class AdminLoginService {
  constructor(private readonly apiExecutor: ApiOperationExecutor) {}

  async adminLogin(payload: AdminLoginRequest) {
    const result = await this.apiExecutor.execute({
      method: "POST",
      endpoint: API_ENDPOINTS.AUTH.ADMIN_LOGIN,
      payload,
      requestSchema: adminLoginRequestSchema,
      successSchema: adminLoginResponseSchema,
      errorSchema: adminLoginErrorResponseSchema,
    });

    if (!result.ok) {
      throw new Error(
        `Admin login failed (HTTP ${result.status}): ${result.data.error}`,
      );
    }

    return result.data;
  }
}
