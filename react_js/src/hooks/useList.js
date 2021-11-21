import { useMemo } from "react";

export const 
  useSortesList = (items, sort) => {
    const sortedList = useMemo(() => {
        if (sort) {
          return [...items].sort((a, b) => {
            if (isNaN(a[sort]))
              return a[sort].localeCompare(b[sort]);
            else
              return a[sort] === b[sort] ? 0 : a[sort] < b[sort] ? -1 : 1;
          });
        }
        return [...items];
      }, [sort, items]);

    return sortedList;
  },
  useList = (items, sort, field, query) => {
    const
      sortedList = useSortesList(items, sort),
      sortedAndSearchedList = useMemo(() => {
        if (sortedList) {
          if (typeof query === 'string')
            return sortedList.filter(item => item[field].toLowerCase().includes(query.toLowerCase()));
          else
            return sortedList.filter(item => item[field] === query);
        }
      }, [field, query, sortedList]);
    
    return sortedAndSearchedList;
  };
