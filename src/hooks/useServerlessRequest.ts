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

const useServerlessRequest = <T>(functionName: string, opts?: ServerlessRequestOptions) => {
    const [data, setData] = useState<ServerlessResponse<T>>({
        isLoading: true,
    });

    // cache serverless function response for 10 days by default
    const cache = useCache<T>('slf_cache__' + functionName, {
        ttl: opts?.ttl ?? 1000 * 60 * 60 * 24 * 10
    });

    const sendRequest = async () => {
        const url = `${window.location.origin}/.netlify/functions/${functionName}`;
        const response = await fetch(url, opts?.fetchOptions);
        return await response.json();
    };

    const checkCache = useCallback(() => {
        const cachedData = cache.get();
        console.log(requestIdleCallback);

        if (cachedData) {
            return setData({
                isLoading: false,
                data: cachedData,
            });
        }

        sendRequest()
            .then(data => {
                setData({ isLoading: false, data });
                cache.set(data);
            }).catch(error => {
                console.error(error);
            });
    }, [functionName]);

    useEffect(() => {
        checkCache();
    }, [functionName]);

    return data;
};

export default useServerlessRequest;