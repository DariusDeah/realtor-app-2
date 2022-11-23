import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { dbClient } from './utils/dynamo.config';
import cookie from 'cookie';
import { JWTHandler } from './utils/jwtHandler';
import { JwtPayload } from 'jsonwebtoken';
import { BadRequestError, LambdaProxyErrorHandler, NotFoundError, UnAuthorizedError } from './utils/errorHandler';
import { DEFAULT_HEADERS } from './headers';
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
        if (!event.body) {
            return new BadRequestError('home object required');
        }

        const cookieJWT = cookie.parse(event.headers['Cookie']);
        const decodedJWT = JWTHandler.verifyToken(cookieJWT['jwt']) as JwtPayload;
        const userId = decodedJWT.sub?.split('|')[1];

        //Read cookie from header, deserialize, add to home object as creator_id
        if (!userId) {
            console.error(`${userId} is invalid id`);
            throw new NotFoundError('no user found');
        }
        const home = JSON.parse(event.body);
        console.log(home);
        home['creator_id'] = userId;

        await dbClient
            .put({
                TableName: 'HomeTableV3',
                Item: { ...home },
            })
            .promise();
        response = {
            headers: { ...DEFAULT_HEADERS },
            body: JSON.stringify(home),
            statusCode: 200,
            isBase64Encoded: false,
        };
    } catch (err) {
        console.error(err);
        return new LambdaProxyErrorHandler(err).customResponse();
    }
    return response;
};
