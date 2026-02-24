import axios from 'axios';

// base URL will be proxied by Vite during development
const API = axios.create({ baseURL: '/api' });

export const registerUser = async (data) => {
  const resp = await API.post('/auth/register', data);
  return resp.data;
};

export const loginUser = async (data) => {
  const resp = await API.post('/auth/login', data);
  return resp.data;
};

export default {
  registerUser,
  loginUser,
};