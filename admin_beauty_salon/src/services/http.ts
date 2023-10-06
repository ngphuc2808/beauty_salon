import Axios, { AxiosResponse } from "axios";

const http = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error.response?.data ? error.response.data : error);
  }
);

export default http;
