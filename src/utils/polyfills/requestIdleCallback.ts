export default () => {
    if (typeof window.requestIdleCallback === 'function') return;

    window.requestIdleCallback = (
        callback: (deadline: IdleDeadline) => void,
        options?: { timeout?: number }
    ) => {
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
}