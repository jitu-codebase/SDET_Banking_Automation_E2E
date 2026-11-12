import { z } from "zod";

// Admin Login Request
export const adminLoginRequestSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(1),
});

// Admin Login Success Response
export const adminLoginResponseSchema = z.strictObject({
  success: z.boolean(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number(),
    user: z.object({
      id: z.string(),
      customerId: z.string(),
      email: z.string(),
      username: z.string(),
      role: z.string(),
      onboardingComplete: z.boolean(),
    }),
  }),
});

// Admin Login Error Response
export const adminLoginErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

// TypeScript types inferred directly from Zod schemas
export type AdminLoginRequest = z.infer<typeof adminLoginRequestSchema>;

export type AdminLoginResponse = z.infer<typeof adminLoginResponseSchema>;

export type AdminLoginErrorResponse = z.infer<
  typeof adminLoginErrorResponseSchema
>;
