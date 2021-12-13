import { useState, useEffect } from 'preact/hooks';
import { useDebouncedCallback } from 'use-debounce-preact';

const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [handleResize] = useDebouncedCallback(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, 120, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

export default useWindowSize;