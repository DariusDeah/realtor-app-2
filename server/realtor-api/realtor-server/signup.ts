import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createHmac } from 'node:crypto';
import { User } from './user.model';

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

        const dbClient = new DynamoDB.DocumentClient();
        const createdUser = new User(JSON.parse(event.body));
        console.log(createdUser);

        // hash users password;
        createdUser.password = createHmac('sha256', 'secret!!!').update(createdUser.password).digest('hex');

        //store in dynamo async
        await dbClient
            .put({
                TableName: 'UserTable',
                Item: { ...createdUser },
            })
            .promise();

        //api response
        response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
            },
            body: JSON.stringify({
                message: 'Successful Signup',
                data: createdUser,
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
            },
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),
        };
    }

    return response;
};
