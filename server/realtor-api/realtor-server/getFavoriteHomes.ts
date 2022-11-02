import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { appendHeaders } from './utils/appendHeaders';
import { AuthHandler } from './utils/authHandler';
import { dbClient } from './utils/dynamo.config';

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
        console.log({ event }, { context });
        if (!event.headers['Cookie']) {
            return (response = {
                statusCode: 403,
                body: JSON.stringify({
                    err: {
                        statusCode: 401,
                        message: 'unauthorized action,please authenticate and try again',
                    },
                }),
                headers: appendHeaders(),
                isBase64Encoded: false,
            });
        }
        const userId = AuthHandler.getUserIdFromJwtCookieHeader(event);
        //Read cookie from header, deserialize, add to home object as creator_id
        if (!userId) {
            throw new Error(` invalid id`);
        }

        const results = await dbClient
            .query({
                TableName: 'HomeTableV3',
                KeyConditionExpression: 'creator_id =:hashKey',
                ExpressionAttributeValues: {
                    ':hashKey': userId,
                },
            })
            .promise();
        response = {
            headers: appendHeaders(),
            body: JSON.stringify(results.Items),
            statusCode: 200,
            isBase64Encoded: false,
        };
    } catch (err) {
        response = {
            headers: appendHeaders(),
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),

            isBase64Encoded: false,
        };
    }
    return response;
};
