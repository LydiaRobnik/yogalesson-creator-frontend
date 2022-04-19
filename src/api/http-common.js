import axios from 'axios';

// TODO dev-prod-Umgebungsvariable
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
