import axios from 'axios';

export default class TodoService {
  static async getAllTodos({limit = 10, page = 1}) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
      params: {
        _limit: limit,
        _page: page
      }
    });

    return response;
  }
};