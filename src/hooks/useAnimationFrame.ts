import { useRef, useEffect } from 'preact/hooks';

const useAnimationFrame = (handler: () => void) => {
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

    const frameHandler = () => {
        frame.current = window.requestAnimationFrame(frameHandler);
        handler();
    };

    useEffect(() => {
        return () => stop();
    }, []);

    return {
        start,
        stop,
    };
}

export default useAnimationFrame;