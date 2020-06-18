import { axiosInstance } from 'src/common/apiService/apiInstance';

export const getAuthToken = (restApi, obj, headers = {}) => {
  return axiosInstance
    .post(restApi, obj, headers)
    .then(response => {
      return response;
    })
    .catch(e => {
      console.log('error', e);
    });
};
