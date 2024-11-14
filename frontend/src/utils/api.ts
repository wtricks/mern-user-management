import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const toast = useToast();

    if (error.response) {
      const res = error.response.data;
      if (res.errors) {
        res.errors.forEach((error: any) => {
          toast.error(error.msg);
        })
      } else {
        toast.error(res.message);
      }
    } else if (error.request) {
      toast.error('No response received from server.');
    } else {
      toast.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
