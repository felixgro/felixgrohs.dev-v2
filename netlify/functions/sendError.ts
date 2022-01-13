import { Handler } from '@netlify/functions';
import { sendMail } from './../libs/mailer';
import { response } from '../libs/http';

interface ErrorData {
    message: string;
    agent: string;
    stack: string;
}

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST' || !event.body) return response(400);

    const error: ErrorData = JSON.parse(event.body);

    try {
        await sendMail({
            fromName: '[Error Bot] felixgrohs.dev',
            fromMail: 'bot@felixgrohs.dev',
            toName: 'Felix Grohs',
            toMail: 'me@felixgrohs.dev',
            subject: error.message,
            body: `
                <small>${error.agent}</small>
                <pre>${error.stack}</pre>
            `
        });
    } catch (err: any) {
        return response(500, err);
    }

    return response(200, 'mail sent successfully');
}