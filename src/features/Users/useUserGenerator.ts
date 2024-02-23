import { Faker, fakerDE, fakerFR, fakerPL } from "@faker-js/faker";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import useAppDispatch from "../../hooks/useAppDispatch";
import { GenerationLocales, addUsers, clean } from "./usersSlice";
import { useEffect, useRef } from "react";
import UserGenerator from "./UserGenerator";

const fakers: Record<GenerationLocales, Faker> = {
  "de-DE": fakerDE,
  "fr-FR": fakerFR,
  "pl-PL": fakerPL,
};

const useUserGenerator = () => {
  const config = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();
  const generatorRef = useRef(new UserGenerator(fakers[config.locale]));

  useEffect(() => {
    dispatch(clean());

    generatorRef.current.setFaker(fakers[config.locale]);
    generatorRef.current.setSeed(parseInt(config.seed) || undefined);

    generatorRef.current.cleanCounter();
  }, [config]);

  return () => {
    dispatch(addUsers(generatorRef.current.generate(30)));
  };
};

export default useUserGenerator;
