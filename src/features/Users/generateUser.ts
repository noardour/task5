import { faker } from "@faker-js/faker";
import { IUser } from "./types";

let counter = 0;

export default function generateUser(): IUser {
  console.log(counter);
  return {
    num: ++counter,
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    address: faker.location.streetAddress(true),
    phone: faker.phone.number(),
  };
}
