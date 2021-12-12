import { useRef, useEffect, useCallback } from 'preact/hooks';

const useAnimationFrame = (handler: () => void) => {
    const frame = useRef<number | null>(null);

    const frameHandler = useCallback(() => {
        frame.current = window.requestAnimationFrame(frameHandler);
        handler();
    }, [handler]);

    const start = useCallback(() => {
        frame.current = window.requestAnimationFrame(frameHandler);
    }, [frameHandler]);

    const stop = useCallback(() => {
        if (frame.current) {
            window.cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    }, [frame.current]);

    useEffect(() => {
        return () => stop();
    }, []);

    return {
        start,
        stop,
    };
}

export default useAnimationFrame;