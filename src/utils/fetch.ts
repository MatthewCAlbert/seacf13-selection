import axios, { AxiosRequestConfig } from 'axios';

const fetch = (token = "", useBaseUrl = true)=>{
  let options: AxiosRequestConfig = {};

  options.baseURL = useBaseUrl ? (process.env.NEXT_PUBLIC_API_URL || "")+ '/api' : "";
  options.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const instance = axios.create(options);

  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  })

  return instance;
}

export {fetch};