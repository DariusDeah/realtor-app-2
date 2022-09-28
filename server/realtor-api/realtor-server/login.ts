import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        if (!event.body) {
            throw new Error('user required');
        }
        const { id } = JSON.parse(event.body);
        const dbClient = new DynamoDB.DocumentClient();

        // hash users password;

        //store in dynamo async
        const data = await dbClient.get({ TableName: 'UserTable', Key: id }).promise();
        data.$response.data.password = null;

        //api response
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successful Signup',
                data: data.$response.data,
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),
        };
    }

    return response;
};
