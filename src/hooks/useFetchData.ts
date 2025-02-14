import { useEffect, useState } from 'react';

type APIResponse = Record<string, any>;

export default function useFetchData(apiEndpoints: Record<string, string>) {
  const [data, setData] = useState<APIResponse>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.allSettled(
        Object.entries(apiEndpoints).map(async ([platform, url]) => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error loading data from ${platform}`);
            const data = await response.json();
            return [platform, data];
          } catch {
            return [platform, null];
          }
        }),
      );

      const successfulData = Object.fromEntries(
        responses
          .filter((res) => res.status === 'fulfilled' && res.value[1] !== null)
          .map((res) => (res as PromiseFulfilledResult<[string, any]>).value),
      );
      const errors = responses
        .filter(
          (res) =>
            res.status === 'rejected' || (res.status === 'fulfilled' && res.value[1] === null),
        )
        .map((res) =>
          res.status === 'rejected' ? res.reason : `Error loading data from ${res.value[0]}`,
        );

      setData(successfulData);
      setError(errors.length ? errors.join('; ') : null);
      setIsLoading(false);
    };

    fetchData();
  }, [apiEndpoints]);

  return { data, isLoading, error };
}
