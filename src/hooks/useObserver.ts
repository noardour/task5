import { useEffect, useRef } from "react";

const useObserver = <T extends Element>(callback: () => void, stop: boolean = false, intersection: boolean = true) => {
  const ref = useRef<T>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (ref.current) {
      const cb: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting == intersection && !stop) {
          callback();
        }
      };

      observer.current = new IntersectionObserver(cb);
      observer.current.observe(ref.current);
    }

    return () => observer.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return ref;
};

export default useObserver;
