import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DEFAULT_HEADERS } from './headers';
import { User } from './user.model';
import { dbClient } from './utils/dynamo.config';
import { BadRequestError, LambdaProxyErrorHandler } from './utils/errorHandler';
import { hideFields } from './utils/hideFields';
import { JWTHandler } from './utils/jwtHandler';
import { PasswordHandler } from './utils/password-handler';
import cookie from 'cookie';

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        console.log({ event, context });
        if (!event.body) {
            throw new BadRequestError('user date required');
        }

        const res = await dbClient
            .query({
                TableName: 'UserTable',
                IndexName: 'email-id-index',
                Limit: 1,
                KeyConditionExpression: 'email  = :user_email',
                ExpressionAttributeValues: {
                    ':user_email': JSON.parse(event.body)['email'].toLowerCase(),
                },
            })
            .promise();
        console.log(res.Items);
        if (!res.Items || !res.Items.length) {
            throw new BadRequestError('incorrect email or password');
        }
        const foundUser = res.Items[0] as User;
        const isValidAuthentication = await PasswordHandler.comparePasswords(
            foundUser.password,
            JSON.parse(event.body)['password'],
        );
        if (!isValidAuthentication) {
            throw new BadRequestError('incorrect email or password');
        }
        //create jwt
        const safeModifiedUser = hideFields(foundUser, ['password']);
        const jwtToken = JWTHandler.signToken(foundUser);
        const jwtCookie = cookie.serialize('jwt', jwtToken, {
            domain: '.pillow-zillow.com',
            secure: true,
            path: '/',
            sameSite: 'none',
            maxAge: 24 * 60 * 60,
            priority: 'medium',
        });
        //api response
        hideFields(foundUser, ['password']);
        response = {
            statusCode: 200,
            headers: {
                ...DEFAULT_HEADERS,
                'Set-Cookie': jwtCookie,
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                message: 'Successful Sign in',
                data: safeModifiedUser,
            }),
        };
    } catch (err) {
        console.error(err);
        return new LambdaProxyErrorHandler(err).customResponse();
    }

    return response;
};
