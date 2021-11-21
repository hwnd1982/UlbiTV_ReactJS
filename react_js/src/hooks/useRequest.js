/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useRequest = request => {
  const
    [data, setData] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] =useState('');

  useEffect(async () => {
      try {
        setLoading(true);

        const response = await request();
        
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      };
  }, []);

  return [data, loading, error]
}

export default useRequest;
