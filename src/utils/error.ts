export const sendError = async (error: Error) => {
    return await fetch(`${window.location.origin}/.netlify/functions/sendError`, {
        method: 'POST',
        body: JSON.stringify({
            message: error.message,
            agent: navigator.userAgent,
            stack: error.stack,
        }),
    });
}

export const handleError = async (error: Error) => {
    await sendError(error);
};