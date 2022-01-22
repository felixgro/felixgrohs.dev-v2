import { Handler } from '@netlify/functions';
import { sendMail } from '../libs/mailer';
import { response } from '../libs/http';

interface ErrorData {
    message: string;
    agent: string;
    stack: string;
}

export const handler: Handler = async (evt, ctx) => {
    if (evt.httpMethod !== 'POST') return response(405);
    if (!evt.body) return response(400);

    const {
        MAILERSEND_TOKEN: token,
        MAILERSEND_FROM: fromMail,
        MAILERSEND_FROM_NAME: fromName,
        MAILERSEND_TO: toMail,
        MAILERSEND_TO_NAME: toName,
    } = process.env;

    if (!token || !fromMail || !fromName || !toMail || !toName) {
        return response(500, 'Missing environment variables for realtime error reporting.');
    }

    const error: ErrorData = JSON.parse(evt.body);
    const subject = error.message;

    const text = `
        Error occurred on: ${error.agent}:
        ${error.stack}
    `;

    const body = `
        <small>${error.agent}</small>
        <pre>${error.stack}</pre>
    `;

    await sendMail({
        token,
        fromMail,
        fromName,
        toMail,
        toName,
        subject,
        body,
        text
    });

    return response(200, 'mail sent successfully');
}