import { API } from '../../../services/axios';

export const loginUser = async (credentials) => {
  const response = await API.post('/api/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post('/api/auth/logout');
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get('/api/auth/me');
  return response.data;
};