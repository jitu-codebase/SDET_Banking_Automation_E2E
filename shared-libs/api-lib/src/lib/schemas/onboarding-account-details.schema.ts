import { z } from "zod";

export const onboardingAccountDetailsRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  accountType: z.string(),
});

export const onboardingAccountDetailsResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    step: z.number(),
    nextStep: z.string().min(1),
  }),
  message: z.string().min(1),
});

export const onboardingAccountDetailsErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type OnboardingAccountDetailsRequest = z.infer<
  typeof onboardingAccountDetailsRequestSchema
>;
export type OnboardingAccountDetailsResponse = z.infer<
  typeof onboardingAccountDetailsResponseSchema
>;

export type OnboardingAccountDetailsError = z.infer<
  typeof onboardingAccountDetailsErrorSchema
>;
