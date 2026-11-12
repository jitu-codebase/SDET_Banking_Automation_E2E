import { z } from "zod";

export const RegisterCustomerServiceRequestSchema = z.strictObject({
  email: z.email(),
});

export const RegisterCustomerServiceResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().min(1),
  data: z.object({
    userId: z.string().min(1),
    customerId: z.string().min(1),
  }),
});

export const onboardingRegisterUserErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type RegisterCustomerServiceRequest = z.infer<
  typeof RegisterCustomerServiceRequestSchema
>;
export type RegisterCustomerServiceResponse = z.infer<
  typeof RegisterCustomerServiceResponseSchema
>;
export type OnboardingRegisterUserError = z.infer<
  typeof onboardingRegisterUserErrorSchema
>;
