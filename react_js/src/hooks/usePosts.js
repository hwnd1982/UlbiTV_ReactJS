import { useMemo } from "react";

export const 
  useSortesPost = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
          return [...posts].sort((a, b) => {
            if (isNaN(a[sort]))
              return a[sort].localeCompare(b[sort]);
            else
              return a[sort] === b[sort] ? 0 : a[sort] < b[sort] ? -1 : 1;
          });
        }
        return [...posts];
      }, [sort, posts]);

    return sortedPosts;
  },
  usePosts = (posts, sort, query) => {
    const
      sortedPosts = useSortesPost(posts, sort),
      sortedAndSearchedPosts = useMemo(() => {
        if (sortedPosts)
          return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
      }, [query, sortedPosts]);
    
    return sortedAndSearchedPosts;
  };
