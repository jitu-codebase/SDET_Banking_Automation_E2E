import { getAllCustomerResponse } from "@api-lib";

export class HELPER {
  static verifyCustomerDetailsAfterOnboarding(
    response: getAllCustomerResponse,
    customerId: string,
    accountNumber: string,
    isActive: boolean,
  ): void {
    const match = response.data.find(
      (customer) =>
        customer.customerId === customerId &&
        customer.account?.accountNumber === accountNumber &&
        customer.account?.isActive === isActive,
    );

    if (match) {
      console.log("Customer details verified successfully");
    } else {
      console.warn(
        `No matching customer for customerId=${customerId}, accountNumber=${accountNumber}, isActive=${isActive}`,
      );
    }
  }
}
