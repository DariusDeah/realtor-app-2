import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createHmac } from 'node:crypto';
import { headers } from './headers';
import { User, UserFields } from './user.model';
import { appendHeaders } from './utils/appendHeaders';
import { hideFields } from './utils/hideFields';
import { PasswordHandler } from './utils/password-handler';

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
        const env = 'dev';
        console.log({ event }, { context });

        if (!event.body) {
            throw new Error('user required');
        }

        const dbClient = new DynamoDB.DocumentClient();

        const createdUser = new User(JSON.parse(event.body));

        // hash users password;
        createdUser.password = await PasswordHandler.hashPassword(createdUser.password);

        //store in dynamo async
        await dbClient
            .put({
                TableName: 'UserTable',
                Item: { ...createdUser },
            })
            .promise();

        //hide password field
        const safeModifiedUser = hideFields(createdUser, UserFields.password);
        //api response
        response = {
            statusCode: 200,
            headers: appendHeaders(),
            body: JSON.stringify({
                message: 'Successful Signup',
                data: safeModifiedUser,
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            headers,
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),
        };
    }

    return response;
};
