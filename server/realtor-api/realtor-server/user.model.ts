import { nanoid } from 'nanoid';
export class User {
    id: string;
    full_name: string;
    email: string;
    password: string;
    profile_img_url: string;
    favorite_homes?: any[];
    membership_status: 'premium' | 'base';
    recently_viewed?: any[];
    timezone: string;
    zip_code: string;
    is_active: boolean;
    constructor(data: User) {
        this.full_name = data.full_name;
        this.email = data.email;
        this.password = data.password;
        this.id = nanoid();
        this.profile_img_url = data.profile_img_url || '';
        this.favorite_homes = data.favorite_homes || [];
        this.membership_status = data.membership_status || 'base';
        this.recently_viewed = data.recently_viewed || [];
        this.timezone = data.timezone || '';
        this.zip_code = data.zip_code || '';
        this.is_active = true;
    }
}
