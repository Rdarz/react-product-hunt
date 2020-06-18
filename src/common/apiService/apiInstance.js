import axios from 'axios';
import { api } from './apiConfig';

export const axiosInstance = axios.create({
  baseURL: api.baseURL + api.restApiRoot
});

axiosInstance.interceptors.request.use(
  function(config) {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
