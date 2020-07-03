import {message} from 'antd';
import { IParamsObject } from '../../declare';
import { HOST } from '../../config/env';

function toQueryString(paramsObject: IParamsObject) {
    return Object
        .keys(paramsObject)
        .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        .join('&');
}

export function post(url: string, data: Object, msg?: string) {
    return fetch(HOST + url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(response => {
        if (msg) {
            message.success(msg);
        }
        return response.json()
    })
}

export function get(url: string, data?: Object, msg?: string) {

    let query = '';

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        // @ts-ignore
        query = `?${toQueryString(data)}`;
    }
    const _url = `${HOST}${url}${query}`;

    return fetch(_url, { cache: 'no-cache' })
        .then(function(response) {
            if (msg) {
                message.success(msg);
            }
            return response.json();
        })
}
