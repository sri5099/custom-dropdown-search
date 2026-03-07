import axios from 'axios';

const BASE_URL = 'https://your-api-base-url.com/api';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle full URLs
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url) {
      // Check if config.url is absolute URL
      const isAbsoluteURL = /^(?:\w+:)\/\//.test(config.url);
      if (!isAbsoluteURL) {
        // Prepend base URL if not absolute
        config.url = BASE_URL + config.url;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
