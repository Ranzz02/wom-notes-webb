import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const API = axios.create();

export const setupAxiosInterceptors = (navigate: NavigateFunction) => {
  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
};

export default API;
