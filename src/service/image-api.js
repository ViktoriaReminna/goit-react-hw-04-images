import axios from 'axios';

const API_KEY = '38291205-6302b6893cb52f44d3517b0f7';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const getImages = async (query, page) => {
  const separated = query.split('/');
  const exstractedQuery = separated[1];
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: exstractedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
