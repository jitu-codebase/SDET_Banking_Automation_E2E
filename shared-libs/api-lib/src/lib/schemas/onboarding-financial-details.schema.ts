import { z } from "zod";

export const FinancialDetailsServiceRequestSchema = z.strictObject({
  sourceOfIncome: z.string().min(1),
});

export const FinancialDetailsServiceResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    step: z.number(),
    nextStep: z.string().min(1),
  }),
  message: z.string().min(1),
});

export const FinancialDetailsServiceErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type FinancialDetailsServiceRequest = z.infer<
  typeof FinancialDetailsServiceRequestSchema
>;
export type FinancialDetailsServiceResponse = z.infer<
  typeof FinancialDetailsServiceResponseSchema
>;

export type FinancialDetailsServiceErrorResponse = z.infer<
  typeof FinancialDetailsServiceErrorSchema
>;
