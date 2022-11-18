import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Home } from './home.model';
import { appendHeaders } from './utils/appendHeaders';
import { dbClient } from './utils/dynamo.config';
import cookie from 'cookie';
import { JWTHandler } from './utils/jwtHandler';
import { JwtPayload } from 'jsonwebtoken';
import { LambdaProxyErrorHandler } from './utils/errorHandler';
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
                statusCode: 401,
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
        if (!event.body) {
            return (response = {
                statusCode: 400,
                body: JSON.stringify({
                    err: {
                        statusCode: 400,
                        message: 'home object required',
                    },
                }),
                headers: appendHeaders(),
                isBase64Encoded: false,
            });
        }

        const cookieJWT = cookie.parse(event.headers['Cookie']);
        console.log({ cookieJWT }, cookieJWT['jwt'], event.headers['Cookie']);
        const decodedJWT = JWTHandler.verifyToken(cookieJWT['jwt']) as JwtPayload;
        const userId = decodedJWT.sub?.split('|')[1];
        //Read cookie from header, deserialize, add to home object as creator_id
        if (!userId) {
            throw new Error(`${userId} is invalid id`);
        }
        const home = new Home(JSON.parse(event.body));
        home['creator_id'] = userId;

        // const updatedLikedHomes = await dbClient
        //     .update({
        //         TableName: 'HomeTableV2',
        //         Key: {
        //             creator_id: userId,
        //         },
        //         UpdateExpression: 'Set #c = list_append(#c,:values)',
        //         ExpressionAttributeNames: {
        //             '#c': 'homes',
        //         },
        //         ExpressionAttributeValues: {
        //             ':values': [{ ...home }],
        //         },
        //         ReturnValues: 'UPDATED_NEW',
        //         // Item: [{ ...home }],
        //     })
        //     .promise();
        const updatedLikedHomes = await dbClient
            .put({
                TableName: 'HomeTableV3',
                Item: { ...home },
                ReturnValues: 'ALL_OLD',
            })
            .promise();
        response = {
            headers: appendHeaders(),
            body: JSON.stringify(updatedLikedHomes.$response.data),
            statusCode: 200,
            isBase64Encoded: false,
        };
    } catch (err) {
        console.error(err);
        return new LambdaProxyErrorHandler(err).customResponse();
    }
    return response;
};
