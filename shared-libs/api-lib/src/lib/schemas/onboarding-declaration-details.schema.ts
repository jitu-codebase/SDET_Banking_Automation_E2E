import { z } from "zod";

export const DeclarationServiceRequestSchema = z.strictObject({
  declarationAccepted: z.boolean(),
});

export const DeclarationServiceResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    customerId: z.string().min(1),
    accountNumber: z.string().min(1),
    ifscCode: z.string().min(1),
    message: z.string().min(1),
  }),
  message: z.string().min(1),
});

export const DeclarationServiceErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type DeclarationServiceRequest = z.infer<
  typeof DeclarationServiceRequestSchema
>;
export type DeclarationServiceResponse = z.infer<
  typeof DeclarationServiceResponseSchema
>;
export type DeclarationServiceError = z.infer<
  typeof DeclarationServiceErrorSchema
>;
