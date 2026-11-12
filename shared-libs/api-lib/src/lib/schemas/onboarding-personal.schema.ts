
import { z } from 'zod';

// Request schema
export const onboardingPersonalRequestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.iso.date(),
  address: z.string().min(1),
});

// Success response schema
export const onboardingPersonalResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    step: z.number(),
    nextStep: z.string(),
  }),
  message: z.string(),
});

// Error response schema
export const onboardingPersonalErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

// Inferred TypeScript types
export type OnboardingPersonalRequest = z.infer<
  typeof onboardingPersonalRequestSchema
>;

export type OnboardingPersonalResponse = z.infer<
  typeof onboardingPersonalResponseSchema
>;

export type OnboardingPersonalError = z.infer<
  typeof onboardingPersonalErrorSchema
>;
