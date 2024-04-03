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

      const isEmptyHeaders = config.headers && Object.keys(config.headers).length === 0;

      const requestHeaders = {
        ...headers,
        ...(isEmptyHeaders ? {} : config.headers) 
      };

      if (config.headers && config.headers.type === "file") {
        const file = new FormData();
        file.append("file", config.data);
        const authConfig = {
          httpVerb: config.httpVerb,
          data: file,
          headers: {
            Authorization: headers['Authorization'],
          }
        };
        config = authConfig;
      } else {
        // Agregar el tipo de contenido predeterminado como 'application/json'
        if (!requestHeaders['Content-Type']) {
          requestHeaders['Content-Type'] = 'application/json';
        }
      }
      const response = await fetch(apiEndpoint, {
        method: config.httpVerb,
        headers: config.headers ? config.headers : requestHeaders,
        body: config.data instanceof FormData ? config.data : JSON.stringify(config.data), // Verificar si los datos son de tipo FormData
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
