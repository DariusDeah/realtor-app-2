import { User } from '../user.model';
import jwt from 'jsonwebtoken';

export class JWTHandler {
    static signToken(user: User) {
        return jwt.sign(
            {
                full_name: user.full_name || user.email,
                email: user.email,
                photo: user.profile_img_url,
                state: user.state,
            },
            'bW96emFyZWxsYV9Jc19Nb19CZXR0YQ==',
            {
                subject: `pillow|${user.id}`,
                issuer: 'https://api.pillow-zillow.com',
                expiresIn: '7d',
            },
        );
    }
    static verifyToken(token: string) {
        return jwt.verify(token, 'bW96emFyZWxsYV9Jc19Nb19CZXR0YQ==');
    }
}
