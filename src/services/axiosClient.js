import axios from "axios";
import {
  ACCESS_TOKEN,
  BASE_URL,
  TOKEN_CYBERSOFT,
} from "../utils/constants/config";

// Set up default config for http requests
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
