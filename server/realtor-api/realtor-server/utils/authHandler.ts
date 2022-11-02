import cookie from 'cookie';
import { JWTHandler } from './jwtHandler';
import { JwtPayload } from 'jsonwebtoken';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class AuthHandler {
    public static getUserIdFromJwtCookieHeader(event: APIGatewayProxyEvent) {
        if (!event.headers['Cookie']) {
            throw new Error('no cookie found');
        }
        const cookieJWT = cookie.parse(event.headers['Cookie']);
        const decodedJWT = JWTHandler.verifyToken(cookieJWT['jwt']) as JwtPayload;
        const userId = decodedJWT.sub?.split('|')[1];
        return userId;
    }
}
