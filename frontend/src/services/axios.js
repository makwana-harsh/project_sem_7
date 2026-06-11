import axios from 'axios';

// Create a central Axios instance
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', 
  withCredentials: true, // Forces browser to send httpOnly cookies automatically
});

// Short-lived Access Token stored in secure, local memory
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Request Interceptor: Automatically attaches the access token to headers if it exists
API.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically handles a 401 token expiration error
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the server returns 401 and we haven't tried retrying yet
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh') {
      originalRequest._retry = true;

      try {
        // Hit the refresh endpoint to get a fresh access token using the httpOnly cookie
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        // Update authorization header and retry original network request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        window.location.href = '/login'; // Session dead, go to login screen
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);