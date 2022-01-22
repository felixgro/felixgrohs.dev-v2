import { useState, useEffect, useCallback } from 'preact/hooks';
import useCache from './useCache';

interface ServerlessResponse<T> {
    isLoading: boolean;
    data?: T;
    error?: unknown;
}

interface ServerlessRequestOptions {
    ttl?: number;
    fetchOptions?: RequestInit;
}

const useServerlessRequest = <T>(url: string, opts?: ServerlessRequestOptions) => {
    const [data, setData] = useState<ServerlessResponse<T>>({
        isLoading: true,
    });

    // cache serverless function response for 10 days by default
    const cache = useCache<T>(`FC_${url}`, {
        ttl: opts?.ttl ?? 1000 * 60 * 60 * 24 * 10
    });

    const sendRequest = async () => {
        const response = await fetch(url, opts?.fetchOptions);
        if (response.ok) {
            return await response.json()
        };

        throw new Error(`Fetch failed with status ${response.status}`);
    };

    useEffect(() => {
        const cachedData = cache.get();

        if (cachedData) {
            return setData({
                isLoading: false,
                data: cachedData,
            });
        }

        sendRequest()
            .then(data => {
                setData({ isLoading: false, data });
                requestIdleCallback(() => cache.set(data));
            }).catch(error => {
                setData({ isLoading: false, error });
            });
    }, [url]);

    return data;
};

export default useServerlessRequest;