import { useRef, useEffect } from 'preact/hooks';

const usePreviousState = <T>(state: T) => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = state;
    });
    return ref.current;
}

export default usePreviousState;