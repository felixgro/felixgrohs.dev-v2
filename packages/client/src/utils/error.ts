export const sendError = async (error: Error) => {
    return await fetch(`/api/sendError`, {
        method: 'POST',
        body: JSON.stringify({
            message: error.message,
            agent: navigator.userAgent,
            stack: error.stack,
        }),
    });
}

export const handleError = async (error: Error) => {
    if (location.origin.includes('localhost')) return;

    await sendError(error);
};