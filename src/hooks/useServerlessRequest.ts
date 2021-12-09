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

    const cache = useCache('sl_cache__' + functionName, {
        ttl: 1000 * 60 * 60 * 60 * 24,
    });

    const sendRequest = async (url: string) => {
        const response = await fetch(url, opts?.fetchOptions);
        const json = await response.json();
        return json;
    };

    const checkCache = useCallback(() => {
        const cachedData = cache.get<T>();
        if (cachedData) {
            setData({
                isLoading: false,
                data: cachedData,
            });
            return;
        }

        console.debug('Updating cache for ' + functionName);
        sendRequest(`${window.location.href}.netlify/functions/${functionName}`)
            .then(data => {
                setData({
                    isLoading: false,
                    data,
                });

                cache.set<T>(data);
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