import { Faker, fakerDE, fakerFR, fakerPL } from "@faker-js/faker";
import { IUser } from "./types";
import { GenerationLocales } from "./usersSlice";

export default class UserGenerator {
  #fakers: Record<GenerationLocales, Faker> = {
    "de-DE": fakerDE,
    "fr-FR": fakerFR,
    "pl-PL": fakerPL,
  };
  #alphabets: Record<GenerationLocales, string> = {
    "de-DE": "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß",
    "fr-FR": "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸabcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ",
    "pl-PL": "ABCDEFGHIJKLMNOPQRSTUVWXYZĄĆĘŁŃÓŚŹŻabcdefghijklmnopqrstuvwxyząćęłńóśźż",
  };
  #locale: GenerationLocales;

  #faker: Faker;
  #counter: number;
  #errCount: number;

  constructor(locale: GenerationLocales) {
    this.#locale = locale;
    this.#faker = this.#fakers[locale];
    this.#counter = 0;
    this.#errCount = 0;
  }

  setLocale(locale: GenerationLocales) {
    this.#locale = locale;
    this.#faker = this.#fakers[locale];
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
    const char = this.#alphabets[this.#locale][this.#faker.number.int({ max: this.#alphabets[this.#locale].length - 1 })];
    if (str.length < 1) return char;
    const strArr = str.split("");
    strArr.splice(this.#faker.number.int({ max: strArr.length - 1 }), 0, char);
    return strArr.join("");
  }

  #removeRandomSymbol(str: string): string {
    if (str.length < 1) return str;
    const i = this.#faker.number.int({ max: str.length - 1 });
    return str.slice(0, i - 1) + str.slice(i + 1, str.length - 1);
  }

  #swapRandomSymbols(str: string): string {
    if (str.length < 2) return str;
    const i = this.#faker.number.int({ max: str.length - 2 });
    const strArr = str.split("");
    const temp = strArr[i];
    strArr[i] = strArr[i + 1];
    strArr[i + 1] = temp;
    return strArr.join("");
  }

  #makeError(user: IUser, n: number) {
    const errFns = [this.#addRandomSymbol, this.#removeRandomSymbol, this.#swapRandomSymbols];
    const errFn = errFns[n % errFns.length];
    const [, , ...keys] = Object.keys(user);
    const key = keys[this.#faker.number.int({ max: keys.length - 1 })] as Exclude<keyof IUser, "num" | "id">;
    user[key] = errFn.bind(this)(user[key]);
  }

  #makeErrors(user: IUser) {
    for (let i = 0; i < this.#errCount; i++) {
      this.#makeError(user, i);
    }
  }

  #generateUser(): IUser {
    const user: IUser = {
      num: ++this.#counter,
      id: this.#faker.string.uuid().slice(0, 8),
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
