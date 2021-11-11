import React from "react";
import { usePagination } from "../../../hooks/usePagination";
import classes from './Pagination.module.css'


const Pagination = ({ totalPages, page, changePage }) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.pageWrapper}>
      {pagesArray.map(item =>
        <span
          key={item}
          onClick={() => changePage(item)}
          className={item === page ?
            [classes.page, classes.pageCurrent].join(' ') : classes.page}
        >
          {item}
        </span>
      )}
    </div>
  );
};

export default Pagination;
