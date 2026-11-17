import { z } from "zod";

export const getAllCustomerRequestSchema = z.object({
  offset: z.coerce.number().int().min(0),
  limit: z.coerce.number().int().positive(),
});

export const customerSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1),
  email: z.email(),
  username: z.string(),
  role: z.string(),
  createdAt: z.iso.datetime(),
  onboardingStep: z.number(),
  onboardingComplete: z.boolean(),
});

export const customerAccountSchema = z.object({
  accountNumber: z.string(),
  balance: z.number(),
  accountType: z.string(),
  isActive: z.boolean(),
});

const finalCustomerSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  email: z.email(),
  username: z.string(),
  role: z.string(),
  createdAt: z.iso.datetime(),
  onboardingStep: z.number(),
  onboardingComplete: z.boolean(),
  account: customerAccountSchema.nullable(),
});

export const getAllCustomerResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(finalCustomerSchema),
  message: z.string(),
});

export const getAllUserErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type getAllCustomerRequest = z.infer<typeof getAllCustomerRequestSchema>;
export type getAllCustomerResponse = z.infer<
  typeof getAllCustomerResponseSchema
>;
export type getAllCustomerResponseError = z.infer<typeof getAllUserErrorSchema>;
