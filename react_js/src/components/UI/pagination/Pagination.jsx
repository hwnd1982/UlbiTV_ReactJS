import React from "react";
import { usePagination } from "../../../hooks/usePagination";


const Pagination = ({ totalPages, page, changePage }) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map(item =>
        <span
          key={item}
          onClick={() => changePage(item)}
          className={item === page ?
            'page page__current' : 'page'}
        >
          {item}
        </span>
      )}
    </div>
  );
};

export default Pagination;
