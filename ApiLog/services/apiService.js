const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  get: (url) => api.get(url).then(res => res.data),
  post: (url, data) => api.post(url, data).then(res => res.data),
  put: (url, data) => api.put(url, data).then(res => res.data),
  delete: (url) => api.delete(url).then(res => res.data),
};
