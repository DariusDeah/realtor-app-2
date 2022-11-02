import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { createClient } from 'redis';
import { appendHeaders } from './utils/appendHeaders';

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
        const client = createClient({
            url: 'redis://redis-cluster-pillow.rvhfa6.ng.0001.usw2.cache.amazonaws.com:6379',
        });

        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        const cacheData = await client.get('gallery');
        console.log(cacheData);
        if (!cacheData?.length) {
            const res = await axios.get(
                `https://api.unsplash.com/photos/random?orientation=squarish&count=30&query=house&client_id=A2HoMb_eT7jMZ5sIxHV-b9CkF9_SzYzsh9tvl8lX_28`,
            );

            await client.set('gallery', res.data, {
                EX: 20,
                NX: true,
            });
            const unsplashResponse = res.data;
            return (response = {
                headers: appendHeaders(),
                statusCode: 200,
                body: JSON.stringify({
                    message: 'successful ',
                    data: unsplashResponse,
                }),
            });
        }
        return (response = {
            headers: appendHeaders(),
            statusCode: 200,
            body: JSON.stringify({
                message: 'successful ',
                data: cacheData,
            }),
        });
    } catch (error) {
        console.log(error);
        response = {
            headers: appendHeaders(),
            statusCode: 500,
            body: JSON.stringify({
                message: error,
            }),
        };
        return response;
    }
};
