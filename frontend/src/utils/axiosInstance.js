import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../config";

const useAxiosWithInterceptor = () => {
  const axiosInstance = axios.create({});
  const navigate = useNavigate();

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const originalRequest = error.config;
      if ((error.response && error.response.status == 401) || 403) {
        axios.defaults.withCredentials = true;
          try {
            const response = await axios.post(`${BASE_URL}token/refresh/`);
            if(response['status'] == 200){
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            navigate("/login");
          }
      }
      Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosWithInterceptor;