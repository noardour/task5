import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addUsers, clean } from "./usersSlice";
import { useEffect, useRef } from "react";
import UserGenerator from "./UserGenerator";

const useUserGenerator = () => {
  const config = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();
  const generatorRef = useRef(new UserGenerator(config.locale));

  useEffect(() => {
    dispatch(clean());

    generatorRef.current.setErrCount(config.errCount || 0);
    generatorRef.current.setLocale(config.locale);
    generatorRef.current.setSeed(parseInt(config.seed) || undefined);

    generatorRef.current.cleanCounter();
  }, [config]);

  return () => {
    dispatch(addUsers(generatorRef.current.generate(30)));
  };
};

export default useUserGenerator;
