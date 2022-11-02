import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createHmac } from 'node:crypto';
import { headers } from './headers';
import { User } from './user.model';
import { appendHeaders } from './utils/appendHeaders';
import { hideFields } from './utils/hideFields';
import { JWTHandler } from './utils/jwtHandler';
import { PasswordHandler } from './utils/password-handler';
import cookie from 'cookie';
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

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        console.log({ event }, { context });

        if (!event.body) {
            throw new Error('user required');
        }

        const createdUser = new User(JSON.parse(event.body));

        // hash users password;
        // createdUser.password = await PasswordHandler.hashPassword(createdUser.password);

        //store in dynamo async
        await dbClient
            .put({
                TableName: 'UserTable',
                Item: { ...createdUser },
            })
            .promise();

        //hide password field
        const safeModifiedUser = hideFields(createdUser, ['password']);
        const jwtToken = JWTHandler.signToken(createdUser);
        const jwtCookie = cookie.serialize('jwt', jwtToken, {
            domain: 'https://www.pillow-zillow.com',
            secure: true,
            path: '/',
        });
        console.log({ jwtToken }, { jwtCookie });
        const otherHeaders: Record<string, any | any[]> = {
            ['cookies']: jwtCookie,
        };

        //api response
        response = {
            statusCode: 200,
            headers: appendHeaders([otherHeaders]),
            body: JSON.stringify({
                message: 'Successful Signup',
                data: safeModifiedUser,
            }),
            isBase64Encoded: false,
        };
    } catch (err) {
        console.log({ err });
        response = {
            statusCode: 500,
            headers: appendHeaders(),
            body: JSON.stringify({
                message: err,
            }),

            isBase64Encoded: false,
        };
    }

    return response;
};
