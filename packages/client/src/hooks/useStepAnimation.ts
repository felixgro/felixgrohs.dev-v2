import { useRef, useMemo, StateUpdater } from 'preact/hooks';
import useAnimationFrame from '@/hooks/useAnimationFrame';

// https://spicyyoghurt.com/tools/easing-functions
type EasingFunction = (time: number, begin: number, change: number, duration: number) => number;

interface StepBasedAnimationOptions {
    duration: number,
    easing: EasingFunction,
}

const useStepAnimation = (state: number, stateUpdater: StateUpdater<number>, opts: StepBasedAnimationOptions) => {
    const begin = useRef(0);
    const change = useRef(0);
    const startTime = useRef(0);

    const frame = useAnimationFrame(() => {
        const time = performance.now() - startTime.current;
        const progress = time / opts.duration;

        if (progress > 1) {
            stateUpdater(begin.current + change.current);
            return frame.stop();
        }

        stateUpdater(() => opts.easing(progress, begin.current, change.current, 1));
    }, [begin, change, startTime, stateUpdater, opts]);

    return {
        animateTo: (to: number) => {
            startTime.current = performance.now();
            begin.current = state;
            change.current = to - state;
            frame.start();
        }
    }
}

export default useStepAnimation;