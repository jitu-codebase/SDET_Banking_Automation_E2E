import { faker } from "@faker-js/faker";

export const formData = (password: string, email: string) => {
  return {
    textInput: faker.lorem.text(),
    email: email,
    password: password,
    numberInput: faker.number.int({ min: 100, max: 9999 }),
    textareaInput: faker.lorem.paragraphs(2),
  };
};
