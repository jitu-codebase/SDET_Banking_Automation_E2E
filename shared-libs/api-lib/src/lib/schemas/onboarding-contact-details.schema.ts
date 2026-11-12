import { z } from "zod";

export const onboardingContactDetailRequestSchema = z.strictObject({
  email: z.email(),
  mobile: z.string(),
});

export const onboardingContactDetailResponseSchema = z.strictObject({
  success: z.literal(true),
  data: z.object({
    step: z.number(),
    nextStep: z.string().min(1),
  }),
  message: z.string().min(1),
});

export const onboardingContactDetailErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type OnboardingContactDetailRequest = z.infer<
  typeof onboardingContactDetailRequestSchema
>;
export type OnboardingContactDetailResponse = z.infer<
  typeof onboardingContactDetailResponseSchema
>;

export type OnboardingContactDetailError = z.infer<
  typeof onboardingContactDetailErrorSchema
>;
