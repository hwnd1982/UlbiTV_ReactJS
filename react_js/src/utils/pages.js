export const
  getPageCount = (totalCount, limit) => Math.ceil(totalCount / limit),
  getCurrentPage = (limit, length) => Math.ceil(length / limit),
  getPagesArray = totalPages => {
    const pagesArray = [];
  
    for (let i = 0; i < totalPages; i++) {
      pagesArray.push(i + 1);
    }
    return pagesArray;
  };
