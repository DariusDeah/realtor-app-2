import { User } from '../user.model';
import jwt from 'jsonwebtoken';

export class JWTHandler {
    static signToken(user: User) {
        return jwt.sign(
            {
                fullName: user.full_name || user.email,
                email: user.email,
                photo: user.profile_img_url,
            },
            'bW96emFyZWxsYV9Jc19Nb19CZXR0YQ==',
            {
                subject: `pillow|${user.id}`,
                issuer: 'pillow-zillow.com',
                expiresIn: '7d',
            },
        );
    }
    static verifyToken(token: string) {
        return jwt.verify(token, 'bW96emFyZWxsYV9Jc19Nb19CZXR0YQ==');
    }
}
