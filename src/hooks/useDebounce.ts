import { useCallback, useRef } from "react";

const useDebounce = <T extends Array<T>>(callback: (...args: T) => void, delay: number) => {
  const timer = useRef<number>();

  const debounceCallback = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
};

export default useDebounce;
