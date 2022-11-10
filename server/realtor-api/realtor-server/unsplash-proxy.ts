import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { DEFAULT_HEADERS } from './headers';
import { unsplashTestData } from './mock-unsplash-res';
import { cacheHelper } from './utils/cacheHelper';
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
        const cachedData = await cacheHelper.fetchFromCache('unsplash-cache-data');
        if (cachedData) {
            return (response = {
                headers: { ...DEFAULT_HEADERS },
                statusCode: 200,
                body: JSON.stringify({
                    message: 'successful',
                    data: cachedData.data,
                }),
                isBase64Encoded: false,
            });
        }

        const res = await axios.get(
            `https://api.unsplash.com/photos/random?orientation=squarish&count=30&query=house&client_id=A2HoMb_eT7jMZ5sIxHV-b9CkF9_SzYzsh9tvl8lX_28`,
        );

        console.log(res);
        const unsplashResponse = res.data;
        await cacheHelper.addToCache({ id: 'unsplash-cache-data', data: unsplashResponse });
        response = {
            headers: { ...DEFAULT_HEADERS },
            statusCode: 200,
            body: JSON.stringify({
                message: 'successful ',
                data: unsplashResponse,
            }),
            isBase64Encoded: false,
        };
    } catch (error) {
        console.log({ error });
        response = {
            headers: { ...DEFAULT_HEADERS },
            statusCode: 500,
            body: JSON.stringify({
                message: error,
            }),
            isBase64Encoded: false,
        };
    }
    return response;
};
