export const API_ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: "/api/auth/login",
  },

  CUSTOMERS: {
    GET_ALL: "/api/customer",
  },
  ONBOARDING: {
    REGISTER_USER: "/api/auth/register",
    PERSONAL_DETAIL: "/api/onboarding/personal",
    CONTACT_DETAIL: "api/onboarding/contact",
    ACCOUNT_DETAIL: "/api/onboarding/account",
    IDENTITY_DETAIL: "/api/onboarding/identity",
    FINANCIAL_DETAIL: "/api/onboarding/financial",
    DECLARATION: "/api/onboarding/declaration",
  },
} as const;
