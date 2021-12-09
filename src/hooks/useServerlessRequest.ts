import { useState, useEffect, useCallback } from 'preact/hooks';
import useCache from './useCache';

interface ServerlessResponse<T> {
    isLoading: boolean;
    data?: T;
    error?: unknown;
}

interface ServerlessRequestOptions {
    cache?: boolean;
    ttl?: number;
    fetchOptions?: RequestInit;
}

const useServerlessRequest = <T>(functionName: string, opts?: ServerlessRequestOptions) => {
    const [data, setData] = useState<ServerlessResponse<T>>({
        isLoading: true,
    });

    // cache serverless function response for 10 days by default
    const cache = useCache<T>('slf_cache__' + functionName, {
        ttl: 1000 * 60 * 60 * 60 * 24 * 10,
    });

    const sendRequest = async () => {
        const url = `${window.location.href}.netlify/functions/${functionName}`;
        const response = await fetch(url, opts?.fetchOptions);
        const json = await response.json();
        return json;
    };

    const checkCache = useCallback(() => {
        const cachedData = cache.get();
        if (cachedData) {
            setData({
                isLoading: false,
                data: cachedData,
            });
            return;
        }

        console.debug('Updating cache for ' + functionName);

        sendRequest()
            .then(data => {
                setData({
                    isLoading: false,
                    data,
                });

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