import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../signup';

describe('Unit test for signup handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            httpMethod: 'post',
            body: `{
                "email": "tester4@.COM",
                "full_name": "tester man3",
                "housing_preferences": {
                  "type": "Apartments",
                  "budget": {
                    "min": 23,
                    "max": 24
                  },
                  "bedrooms":2,
                  "bathrooms":3
                },
                "location": {
                  "address": "100 n tula way",
                  "city": "Memphis",
                  "state": "Napa",
                  "zip_code": "83882"
                },
                "membership_status": "Premium",
                "password": "test12345",
                "profile_img_url": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629630.png"
              }`,
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/api/v1/signup',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/api/v2/signup',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/signup',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            }),
        );
    });
});
