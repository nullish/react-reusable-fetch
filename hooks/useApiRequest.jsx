import React, { useState, useEffect } from "react"; 
import axios from 'axios';

const useApiRequest = (url, config) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url, config)
        .then(response => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
};

export default useApiRequest;
