import { axiosInstance } from 'src/common/apiService/apiInstance';
export const postApi = (restApi, obj, headers = {}) => {
  return axiosInstance
    .post(restApi, obj, headers)
    .then(response => {
      return response;
    })
    .catch(e => {
      console.log('error', e);
    });
};

export const getApi = (restApi, headers = {}) => {
  return axiosInstance
    .get(restApi, headers)
    .then(response => {
      return response;
    })
    .catch(e => {
      console.log('error', e);
    });
};
