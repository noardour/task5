import { Faker } from "@faker-js/faker";
import { IUser } from "./types";

export default class UserGenerator {
  #faker: Faker;
  #counter: number;

  constructor(faker: Faker) {
    this.#faker = faker;
    this.#counter = 0;
  }

  setFaker(faker: Faker) {
    this.#faker = faker;
  }

  setSeed(seed: number | undefined) {
    this.#faker.seed(seed);
  }

  cleanCounter() {
    this.#counter = 0;
  }

  #generateUser(): IUser {
    return {
      num: ++this.#counter,
      id: this.#faker.string.uuid(),
      fullName: this.#faker.person.fullName(),
      address: this.#faker.location.streetAddress(true),
      phone: this.#faker.phone.number(),
    };
  }

  generate(count: number): IUser[] {
    return Array.from({ length: count }, () => this.#generateUser());
  }
}
