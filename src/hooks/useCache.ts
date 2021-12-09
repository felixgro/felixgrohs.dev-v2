import { useState, useCallback, useEffect } from 'preact/hooks';

interface CachedElement<T> {
    timestamp: number;
    data: T;
}

interface CacheOptions {
    ttl?: number;
}

const useCache = <T>(key: string, opts?: CacheOptions) => {

    const get = useCallback(<T>(): T | null => {
        const item = localStorage.getItem(key);
        if (item) {
            const cachedElement = JSON.parse(item);
            const age = Date.now() - cachedElement.timestamp;
            console.debug(`Cache age: ${age / 1000}s`);
            if (cachedElement.timestamp + (opts?.ttl || 0) < Date.now()) {
                console.debug('Cache expired');
                localStorage.removeItem(key);
                return null;
            }
            return cachedElement.data;
        }

        return null;
    }, [key, opts]);

    const set = useCallback(<T>(data: T) => {
        const cached: CachedElement<T> = {
            timestamp: Date.now(),
            data,
        }
        localStorage.setItem(key, JSON.stringify(cached));
    }, [key]);

    return { get, set };
}

export default useCache;