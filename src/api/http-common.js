import axios from 'axios';

// TODO dev-prod-Umgebungsvariable
const apiClient = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export default apiClient;
