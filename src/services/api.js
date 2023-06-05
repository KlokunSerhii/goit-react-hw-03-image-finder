import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34998740-5263be479f93eb60e1ee91a90';

const fetch = (query, page, perPage) => {
  const response = axios
    .get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&per_page=${perPage}`
    )
    .then(({ data }) => data);

  return response;
};

export default fetch;
