import { faker } from "@faker-js/faker";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addUsers, clean } from "./usersSlice";
import { useEffect, useRef } from "react";
import UserGenerator from "./UserGenerator";

const useUserGenerator = () => {
  const config = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();
  const generatorRef = useRef(new UserGenerator(faker));

  useEffect(() => {
    dispatch(clean());

    generatorRef.current.setSeed(parseInt(config.seed) || undefined);

    generatorRef.current.cleanCounter();
  }, [config]);

  return () => {
    dispatch(addUsers(generatorRef.current.generate(30)));
  };
};

export default useUserGenerator;
