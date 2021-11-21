import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    const
      options = { threshold: 1.0 },
      callbackObserver = entries => {
        /* Content excerpted, show below */
        if (entries[0].isIntersecting && canLoad) callback();
      };

    observer.current = new IntersectionObserver(callbackObserver, options);
    observer.current.observe(ref.current);
  }, [callback, canLoad, isLoading, ref]);
};