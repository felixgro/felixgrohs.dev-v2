import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type ResponseBody = Record<string, unknown> | unknown[] | string | null | undefined;

type RequestType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export const response = (status: number, body?: ResponseBody) => {
    return {
        statusCode: status,
        statusText: typeof body === 'string' ? body : undefined,
        body: body ? JSON.stringify(body) : undefined,
    }
}

export const request = async <T>(type: RequestType, url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const requestMethod = axios[type];
    if (typeof requestMethod !== 'function') throw new Error('Invalid request type');
    return await requestMethod.call({}, url, config) as AxiosResponse<T>;
}