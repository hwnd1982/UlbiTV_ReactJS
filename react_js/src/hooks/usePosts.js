import { useMemo } from "react";

export const 
  useSortesPost = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
          return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
      }, [sort, posts]);

    return sortedPosts;
  },
  usePosts = (posts, sort, query) => {
    const
      sortedPosts = useSortesPost(posts, sort),
      sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
  };
