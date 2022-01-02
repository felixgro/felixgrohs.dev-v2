import { RefObject } from 'preact';
import { useState, useEffect, Inputs } from 'preact/hooks';

const useElementSize = <T extends HTMLElement | HTMLElement[]>(ref: RefObject<T>, deps?: Inputs) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const updateSize = () => {
            const el = (Array.isArray(ref.current) ? ref.current[0] : ref.current) as HTMLElement;
            setSize({
                width: el.offsetWidth ?? 0,
                height: el.offsetHeight ?? 0,
            });
        };

        updateSize();
    }, [ref, ...(deps ?? [])]);

    return size;
}

export default useElementSize;