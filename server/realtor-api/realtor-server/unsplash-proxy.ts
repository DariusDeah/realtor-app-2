import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { URL } from 'url';
import { headers } from './headers';
import nodeFetch from 'node-fetch';
import axios from 'axios';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: any) => {
    let response: APIGatewayProxyResult;
    try {
        const res = await axios.get(
            `https://api.unsplash.com/photos/random?orientation=squarish&count=30&query=house&client_id=A2HoMb_eT7jMZ5sIxHV-b9CkF9_SzYzsh9tvl8lX_28`,
        );

        const unsplashResponse = res.data;
        response = {
            headers,
            statusCode: 200,
            body: JSON.stringify({
                message: 'successful ',
                data: unsplashResponse,
            }),
        };
    } catch (error) {
        console.log(error);
        response = {
            headers,
            statusCode: 500,
            body: JSON.stringify({
                message: error,
            }),
        };
    }
    return response;
};
