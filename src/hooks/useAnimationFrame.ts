import { useRef, useEffect, useCallback, Inputs } from 'preact/hooks';

const useAnimationFrame = (handler: () => void, inputs: Inputs) => {
    const frame = useRef<number | null>(null);

    const start = () => {
        frame.current = window.requestAnimationFrame(frameHandler);
    };

    const stop = () => {
        if (frame.current) {
            window.cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    };

    const frameHandler = useCallback(() => {
        start();
        handler();
    }, inputs);

    useEffect(() => {
        return () => stop();
    }, []);

    return {
        start,
        stop,
    };
}

export default useAnimationFrame;