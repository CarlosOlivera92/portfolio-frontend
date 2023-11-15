import { useState, useEffect, useCallback } from "react";

export const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (apiEndpoint, config) => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method: config.httpVerb,
        headers: {
          "Content-Type": "application/json",
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

  const request = useCallback((apiEndpoint, config) => {
    return fetchData(apiEndpoint, config);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    request,
  };
};
