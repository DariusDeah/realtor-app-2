import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DEFAULT_HEADERS } from './headers';
import { appendHeaders } from './utils/appendHeaders';
import { AuthHandler } from './utils/authHandler';
import { dbClient } from './utils/dynamo.config';
import { LambdaProxyErrorHandler, NotFoundError, UnAuthorizedError } from './utils/errorHandler';

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
        if (!event.headers['Cookie']) {
            return new UnAuthorizedError('unauthorized action,please authenticate and try again');
        }
        const userId = AuthHandler.getUserIdFromJwtCookieHeader(event);
        //Read cookie from header, deserialize, add to home object as creator_id
        if (!userId) {
            console.error(`${userId} is invalid id`);
            throw new NotFoundError('no user found');
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
            headers: { ...DEFAULT_HEADERS },
            body: JSON.stringify(results.Items),
            statusCode: 200,
            isBase64Encoded: false,
        };
    } catch (err) {
        console.error(err);
        return new LambdaProxyErrorHandler(err).customResponse();
    }
    return response;
};
