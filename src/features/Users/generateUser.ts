import { faker } from "@faker-js/faker";
import { IUser } from "./types";

export default function generateUser(num: number): IUser {
  return {
    num,
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    address: faker.location.streetAddress(true),
    phone: faker.phone.number(),
  };
}
