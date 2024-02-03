import useAxiosWithInterceptor from "../utils/axiosInstance";
import { BASE_URL } from "../config";
import { useState } from "react";

const useCrud = (initalData) => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState(initalData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (apiURL) => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {
        withCredentials: true,
      });
      const data = response.data;
      setDataCRUD(data);
      setError(null);
      setIsLoading(false);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      setIsLoading(false);
      throw error;
    }
  };

  return [fetchData, dataCRUD, error, isLoading];
};

export default useCrud;