import axios from 'axios';

export default class PostService {
  static async getAllPosts(limin = 10, page = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limin,
        _page: page
    }
  });

    return response;
  }
};
