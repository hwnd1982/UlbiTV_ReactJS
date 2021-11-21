import { useState } from "react";
import useDebounce from "./useDebounce";

const useStateDebounce = (defValue, delay) => {
  const
    [state, setState] = useState(defValue),
    setStateDebounce = useDebounce(setState, delay);

    return [state, setState, setStateDebounce];
};

export default useStateDebounce;