import { User } from '../user.model';
import jwt from 'jsonwebtoken';

export class JWTHandler {
    static signToken(user: User) {
        return jwt.sign(
            {
                name: user.full_name || user.email,
                email: user.email,
                photo: user.profile_img_url,
                state: user.location.state,
            },
            process.env.JWT_SECRET as string,
            {
                subject: `pillow|${user.id}`,
                issuer: 'https://api.pillow-zillow.com',
                expiresIn: '7d',
                audience: 'https://pillow-zillow.com',
            },
        );
    }
    static verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    }
}
