import { Faker } from "@faker-js/faker";
import { IUser } from "./types";

export default class UserGenerator {
  #faker: Faker;
  #counter: number;
  #errCount: number;

  constructor(faker: Faker) {
    this.#faker = faker;
    this.#counter = 0;
    this.#errCount = 0;
  }

  setFaker(faker: Faker) {
    this.#faker = faker;
  }

  setSeed(seed: number | undefined) {
    this.#faker.seed(seed);
  }

  setErrCount(count: number) {
    this.#errCount = count;
  }

  cleanCounter() {
    this.#counter = 0;
  }

  #addRandomSymbol(str: string): string {
    if (str.length < 1 || str.length > 40) return this.#faker.string.alpha();
    const strArr = str.split("");
    strArr.splice(this.#faker.number.int({ min: 0, max: strArr.length - 1 }), 0, this.#faker.string.alpha());
    return strArr.join("");
  }

  #removeRandomSymbol(str: string): string {
    if (str.length < 4) return str;
    const i = this.#faker.number.int({ min: 0, max: str.length - 1 });
    return str.slice(0, i - 1) + str.slice(i + 1, str.length - 1);
  }

  #swapRandomSymbols(str: string): string {
    if (str.length < 2) return str;
    const i = this.#faker.number.int({ min: 0, max: str.length - 2 });
    const strArr = str.split("");
    const temp = strArr[i];
    strArr[i] = strArr[i + 1];
    strArr[i + 1] = temp;
    return strArr.join("");
  }

  #makeError(user: IUser) {
    const errFns = [this.#addRandomSymbol, this.#removeRandomSymbol, this.#swapRandomSymbols];
    const errFn = errFns[this.#faker.number.int({ min: 0, max: errFns.length - 1 })];
    const [, , ...keys] = Object.keys(user);
    const key = keys[this.#faker.number.int({ min: 0, max: keys.length - 1 })] as Exclude<keyof IUser, "num" | "id">;
    user[key] = errFn.bind(this)(user[key]);
  }

  #makeErrors(user: IUser) {
    for (let i = 0; i < this.#errCount; i++) {
      this.#makeError(user);
    }
  }

  #generateUser(): IUser {
    const user: IUser = {
      num: ++this.#counter,
      id: this.#faker.string.uuid(),
      fullName: this.#faker.person.fullName(),
      address: this.#faker.location.streetAddress(true),
      phone: this.#faker.phone.number(),
    };
    this.#makeErrors(user);
    return user;
  }

  generate(count: number): IUser[] {
    return Array.from({ length: count }, () => this.#generateUser());
  }
}
