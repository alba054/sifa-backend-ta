import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import http from "../config/http";

interface IUseFetchWithAbortResponse<T> {
  fetchedData: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function useFetchWithAbort<T>(
  endpoint: string,
  config: AxiosRequestConfig = {}
): IUseFetchWithAbortResponse<T> {
  const [fetchedData, setFetchedData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const { data } = await http.get(endpoint, {
          ...config,
          signal: abortController.signal,
        });
        setIsLoading(false);
        setFetchedData(data);
      } catch (error: any) {
        if (error.name === "AbortError") {
          setError(error);
        }
        if (error.response) {
          setError(error.message.data.message);
        } else {
          setError(error.message);
        }
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint, config]);

  return { fetchedData, isLoading, error };
}
