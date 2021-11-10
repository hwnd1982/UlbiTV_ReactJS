import { useMemo } from "react";
import { getPagesArray } from "../utils/pages";

export const usePagination = totalPages => useMemo(() => getPagesArray(totalPages), [totalPages]);
