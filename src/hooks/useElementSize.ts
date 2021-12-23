import { RefObject } from 'preact';
import { useState, useEffect, Inputs } from 'preact/hooks';

const useElementSize = <E extends HTMLElement>(ref: RefObject<E>, deps: Inputs) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const updateSize = () => {
            setSize({
                width: ref.current?.offsetWidth ?? 0,
                height: ref.current?.offsetHeight ?? 0,
            });
        };

        updateSize();
    }, [ref, ...deps]);

    return size;
}

export default useElementSize;