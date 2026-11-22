import { z } from "zod";

export const deleteCustomerRecordRequestSchema = z.object({
  customer_id: z.string().min(1),
});

export const deleteCustomerRecordResponseSchema = z.object({
  success: z.literal(true),
  data: z.null(),
  message: z.string(),
});

export const deleteCustomerRecordResponseErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type deleteCustomerRecordRequest = z.infer<
  typeof deleteCustomerRecordRequestSchema
>;
export type deleteCustomerRecordResponse = z.infer<
  typeof deleteCustomerRecordResponseSchema
>;
export type deleteCustomerRecordResponseError = z.infer<
  typeof deleteCustomerRecordResponseErrorSchema
>;
