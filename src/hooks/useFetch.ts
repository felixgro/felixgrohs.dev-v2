import { useState, useEffect } from 'preact/hooks';

interface FetchResponse<T> {
    isLoading: boolean;
    data?: T;
    error?: unknown;
}

const useFetch = <T>(url: string, headers: Record<string, string>) => {
    const [data, setData] = useState<FetchResponse<T>>({
        isLoading: true,
    });

    const getData = async (url: string) => {
        try {
            const response = await fetch(url, { headers });
            const json = await response.json();

            setData({
                isLoading: false,
                data: json,
            });
        } catch (error) {
            setData({
                isLoading: false,
                error,
            });
        }
    };

    useEffect(() => {
        getData(url);
    }, [url]);

    return data;
};

export default useFetch;