import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DEFAULT_HEADERS } from './headers';
import { AuthHandler } from './utils/authHandler';
import { dbClient } from './utils/dynamo.config';
import { LambdaProxyErrorHandler, NotFoundError } from './utils/errorHandler';
import { hideFields } from './utils/hideFields';
import { JWTHandler } from './utils/jwtHandler';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const userId = AuthHandler.getUserIdFromJwtCookieHeader(event);
        if (!userId) {
            throw new NotFoundError('user not found');
        }
        const res = await dbClient
            .get({
                TableName: 'UserTable',
                Key: {
                    id: userId,
                },
            })
            .promise();
        if (!res.Item) {
            throw new NotFoundError('user not found');
        }
        const safeModifiedUser = hideFields(res.Item, ['password']);
        return {
            statusCode: 200,
            headers: { ...DEFAULT_HEADERS },
            body: safeModifiedUser,
            isBase64Encoded: false,
        };
    } catch (error) {
        console.error(error);
        return new LambdaProxyErrorHandler(error).customResponse();
    }
};
