import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
const scryptAsync = promisify(scrypt);

export class PasswordHandler {
    public static async hashPassword(password: string) {
        try {
            const salt = randomBytes(16).toString();
            const buf = (await scryptAsync(password, salt, 64)) as Buffer;
            return `${buf.toString('hex')}.${salt}`;
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }

    public static async comparePasswords(storedPassword: string, suppliedPassword: string) {
        try {
            const [hashedPassword, salt] = storedPassword.split('.');
            const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
            return buf.toString('hex') === hashedPassword;
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }
}
