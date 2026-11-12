import { RegisterCustomerServiceRequest } from "@api-lib";

export const createRegisterCustomerPayload = (
  emailID: string,
): RegisterCustomerServiceRequest => {
  return {
    email: emailID,
  };
};
