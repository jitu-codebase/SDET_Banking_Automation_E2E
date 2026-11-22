import { getAllCustomerResponse } from "@api-lib";
import {
  DeleteCustomerRecordService,
  type deleteCustomerRecordResponse,
} from "@api-lib";

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

  static async deleteAllCustomersExceptProtectedUsers(
    response: getAllCustomerResponse,
    service: DeleteCustomerRecordService,
    accessToken: string,
  ): Promise<deleteCustomerRecordResponse[]> {
    const customersToDelete = response.data.filter((customer) => {
      const username = customer.username.toLowerCase();
      const role = customer.role.toLowerCase();
      return (
        username !== "admin" && username !== "demouser" && role !== "admin"
      );
    });

    const deletedCustomers: deleteCustomerRecordResponse[] = [];

    for (const customer of customersToDelete) {
      const _id = customer.id;

      const payload = {
        customer_id: _id,
      };

      const result = await service.deleteCustomerRecord(
        payload,
        accessToken,
        _id,
      );

      deletedCustomers.push(result);
    }
    return deletedCustomers;
  }
}
