import { useState, useCallback } from "react";
export const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (apiEndpoint, config, isAuthenticated) => {
    try {
      setLoading(true);
      const headers = {}; 
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(apiEndpoint, {
        method: config.httpVerb,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(config.data),
      });
      if (!response.ok) {
        throw response;
      } else {
        setData(response);
        setError(null);
        return response;
      }
    } catch (error) {
      setError(error.message);
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  const request = useCallback((apiEndpoint, config, isAuthenticated) => {
    return fetchData(apiEndpoint, config, isAuthenticated);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    request,
  };
};
