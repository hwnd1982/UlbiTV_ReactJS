import { useState } from "react";

const useInput = defValue => {
  const
    [value, setValue] = useState(defValue),
    onChange = event => setValue(event.target.value);

  return { value, setValue, onChange };
};

export default useInput;