/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import useDebounce from "./useDebounce";

export const
  search = (items, field, query ) => items.length ?
    typeof query === 'string' ?
      query ? items.filter(item => item[field].toLowerCase().includes(query.toLowerCase())) : items :
      items.filter(item => item[field] === query) : [],
  filtration = (items, filters) =>  items.length ? filters.length ?
    filters.reduce((result, { field, query }) => result.length ?
      search(result, field, query) : search(items, field, query), []) : items : [],
  sorting = (items, sort) => items ? sort ? 
    items.sort((a, b) => isNaN(a[sort]) ?
      a[sort].localeCompare(b[sort]) :
      a[sort] === b[sort] ? 0 : a[sort] < b[sort] ? -1 : 1) : items : [],
  useFilter = (items, filters) => useMemo(() => filtration(items, filters), [items, filters]),
  useSearch = (items, field, query) => useMemo(() => search(items, field, query), [items, query]),
  useSort = (items, sort) => useMemo(() => sorting(items, sort), [items, sort]),
  useFilterSearchSortEffect = (items, filters, sort, { field, query }, callback, delay) => {
    const
      callbackDebounce = useDebounce(callback, delay),
      filteredItems = useFilter(items, filters),
      foundItems = useSearch(filteredItems, field, query),
      sortedItems = useSort(foundItems, sort);

    useEffect(() => callback(sortedItems), [items]);
    useEffect(() => query ? callbackDebounce(sortedItems) : callback(sortedItems), [query]);
  };
