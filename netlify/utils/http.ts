import axios from 'axios';

type ResponseBody = Record<string, unknown> | unknown[] | string | null | undefined;

export const request = async (url: string, options?: RequestInit) => {
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `TOKEN ${process.env.GITHUB_TOKEN}`,
        }
    });
}

export const response = (status: number, body?: ResponseBody) => {
    return {
        statusCode: status,
        body: body ? JSON.stringify(body) : undefined,
    };
}