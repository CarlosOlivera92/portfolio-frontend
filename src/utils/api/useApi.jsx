import { useState, useEffect, useCallback } from "react";

export const useApi = (config) => {
  const { apiEndpoint, httpVerb, data: requestData } = config; // Incluye los datos a enviar
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method: httpVerb, // Usa el verbo HTTP especificado (GET o POST)
        headers: {
          "Content-Type": "application/json", // Establece el tipo de contenido si es necesario
        },
        body: JSON.stringify(requestData), // Convierte los datos a JSON y envíalos
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);

    }
  }, [apiEndpoint, httpVerb, requestData]);

  useEffect(() => {
  }, [fetchData]);

  const request = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    request,
  };
};
