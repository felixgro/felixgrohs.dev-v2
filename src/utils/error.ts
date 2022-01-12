export const handleError = async (error: Error) => {
    await fetch(`${window.location.origin}/.netlify/functions/sendError`, {
        method: 'POST',
        body: JSON.stringify({
            message: error.message,
            agent: navigator.userAgent,
            stack: error.stack,
        }),
    });
};