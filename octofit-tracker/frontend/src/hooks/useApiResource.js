import { useEffect, useMemo, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

const pickArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (Array.isArray(payload.items)) {
      return payload.items;
    }
  }
  return payload ? [payload] : [];
};

export const useApiResource = (resourcePath, labelOverride) => {
  const label = labelOverride || resourcePath;
  const endpoint = useMemo(() => getApiEndpoint(resourcePath), [resourcePath]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchResource = async () => {
      setLoading(true);
      try {
        console.log(`[${label}] Fetching data from ${endpoint}`);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${label.toLowerCase()}: ${response.status} ${response.statusText}`);
        }
        const payload = await response.json();
        console.log(`[${label}] Raw payload:`, payload);
        const normalized = pickArray(payload);
        if (isMounted) {
          setData(normalized);
          setError(null);
        }
      } catch (fetchError) {
        console.error(`[${label}] Fetch error:`, fetchError);
        if (isMounted) {
          setError(fetchError.message || 'Unknown error');
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchResource();

    return () => {
      isMounted = false;
    };
  }, [endpoint, label]);

  return { data, error, loading, endpoint, label };
};
