import { config } from "@config/environment";
import type { AdminLoginRequest } from "@api-lib";

export const createAdminLoginPayload = (): AdminLoginRequest => {
  return {
    email: config.DEMO_EMAIL,
    password: config.DEMO_PASSWORD,
  };
};
