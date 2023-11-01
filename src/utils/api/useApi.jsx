import { useState, useEffect, useCallback } from "react";

export const useApi = (config) => {
  const { apiEndpoint, httpVerb, data: requestData } = config;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const result = {
      data: null,
      error: null,
    };
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method: httpVerb,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      } else {
        const responseData = await response.json();
        setData(responseData);
        setError(null);
        return response;
      }
    } catch (error) {
      setError(error.message);
      return error;
    } finally {
      setLoading(false);
    }

  }, [apiEndpoint, httpVerb, requestData]);

  const request = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    request,
  };
};
