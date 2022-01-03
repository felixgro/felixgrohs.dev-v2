import { RefObject } from 'preact';
import { useState, useEffect, Inputs, useLayoutEffect } from 'preact/hooks';

const useBcr = <T extends HTMLElement | HTMLElement[]>(ref: RefObject<T>, deps?: Inputs) => {
    const [size, setSize] = useState<DOMRect>(new DOMRect());

    useEffect(() => {
        const updateSize = () => {
            const el = (Array.isArray(ref.current) ? ref.current[0] : ref.current) as HTMLElement;
            if (!el) return;
            getComputedStyle(el).width;
            setSize(el.getBoundingClientRect());
        };

        updateSize();
    }, [ref, ...(deps ?? [])]);

    return size;
}

export default useBcr;