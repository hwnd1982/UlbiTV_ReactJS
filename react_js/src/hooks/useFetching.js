import { useState } from "react";

export const useFetching = callback => {
  const
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(''),
    fetching = async () => {
      try {
        setIsLoading(true);
        await callback();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return [fetching, isLoading, error];
};