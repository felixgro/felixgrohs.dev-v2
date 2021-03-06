export default () => {
    if (typeof window.requestIdleCallback === 'function') return;

    const requestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions): Number => {
        const timeout = options?.timeout ?? 1;
        let timeoutId: number | null = null;
        const startTime = Date.now();

        const handleTimeout = () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            callback({
                didTimeout: false,
                timeRemaining: () => Math.max(0, (timeout) - (Date.now() - startTime)),
            });
        };

        timeoutId = window.setTimeout(handleTimeout, timeout);

        return timeoutId;
    }

    const cancleIdleCallback = (id: number): void => {
        window.clearTimeout(id);
    }

    // @ts-ignore
    window.requestIdleCallback = requestIdleCallback;
    window.cancelIdleCallback = cancleIdleCallback;
}