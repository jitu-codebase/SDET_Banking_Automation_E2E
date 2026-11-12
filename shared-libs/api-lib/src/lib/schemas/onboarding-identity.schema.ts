import { z } from "zod";

export const OnboardingIdentityRequestSchema = z.strictObject({
  panCard: z.string().min(1),
  aadhaarCard: z.string().min(1),
  aadhaarFile: z.object({
    name: z.string().min(1),
    mimeType: z.string().min(1),
    buffer: z.instanceof(Buffer),
  }),
});

export const OnboardingIdentityResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    step: z.number(),
    nextStep: z.string().min(1),
  }),
  message: z.string().min(1),
});

export const OnboardingIdentityErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type IdentityDetailsServiceRequest = z.infer<
  typeof OnboardingIdentityRequestSchema
>;
export type IdentityDetailsServiceResponse = z.infer<
  typeof OnboardingIdentityResponseSchema
>;
export type IdentityDetailsServiceError = z.infer<
  typeof OnboardingIdentityErrorSchema
>;
