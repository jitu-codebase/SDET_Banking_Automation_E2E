import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

export class DynamicDataHelper {
  static generateRandomEmailId(): string {
    return `automation-${randomUUID()}@gmail.com`;
  }

  static generateRandomFirstName(): string {
    return faker.person.firstName();
  }

  static generateRandomLastName(): string {
    return faker.person.lastName();
  }

  static generateRandomDOB(): string {
    return faker.date
      .birthdate({
        mode: "year",
        min: 18,
        max: 80,
      })
      .toISOString()
      .split("T")[0];
  }

  static generateRandomAddress(): string {
    return faker.location.streetAddress({
      useFullAddress: true,
    });
  }

  static generateRandomUsername(): string {
    const username =
      `${this.generateRandomFirstName()}${this.generateRandomLastName()}`.replace(
        /[^a-zA-Z]/g,
        "",
      );
    return username.toLowerCase();
  }

  static generateRandomPancardNumber(): string {
    return `${faker.string.alpha(5)}${faker.string.numeric(4)}${faker.string.alpha(1)}`;
  }

  static generateRandomAadharNumber(): string {
    return faker.string.numeric(12);
  }
}
