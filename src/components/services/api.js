import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34998740-5263be479f93eb60e1ee91a90';

class ApiService {
  constructor(query) {
    this.page = 1;
    this.per_page = 12;
    this.query = query;
  }

  fetch() {
    const response = axios
      .get(
        `${BASE_URL}?q=${this.query}&page=${this.page}&key=${API_KEY}&per_page=${this.per_page}`
      )
      .then(({ data }) => data);

    return response;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
export { ApiService };
