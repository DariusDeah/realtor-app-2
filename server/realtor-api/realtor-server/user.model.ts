import { BadRequest } from './utils/errorHandler';

//class validation is within model
export class User {
    id: string;
    full_name: string;
    email: string;
    password: string;
    profile_img_url: string;
    favorite_homes?: string[];
    membership_status: 'Premium' | 'Base';
    recently_viewed?: string[];
    timezone: string;
    location: {
        address: string;
        state: string;
        city: string;
        zip_code: string;
    };

    housing_preferences: {
        type: string;
        budget: {
            min: number;
            max: number;
        };
        bedrooms: number;
        bathrooms: number;
    };

    is_active: boolean;

    constructor(data: User) {
        this.full_name = data.full_name;
        this.email = this.validateEmail(data.email.toLowerCase().trim());
        this.password = this.validatePassword(data.password);
        this.id = data.id;
        this.profile_img_url = this.validateProfileImage(data.profile_img_url) || '';
        this.favorite_homes = data.favorite_homes || [];
        this.membership_status = data.membership_status || 'Base';
        this.recently_viewed = data.recently_viewed || [];
        this.timezone = data.timezone || '';
        this.is_active = true;
        this.housing_preferences = data.housing_preferences || {};
        this.location = data.location || {};
    }

    private validateEmail(email: string) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            throw new BadRequest(`Invalid email ${email}`);
        }
        return email;
    }

    private validatePassword(password: string) {
        if (password.length < 8) {
            throw `Invalid password ${password}, must be at least 8 characters`;
        }
        return password;
    }

    private validateProfileImage(image: string) {
        if (!image.includes('https://')) {
            throw `Invalid profile image ${image}`;
        }
        return image;
    }
}

export enum UserFields {
    id = 'id',
    full_name = 'full_name',
    email = 'email',
    password = 'password',
    profile_img_url = 'profile_img_url',
    favorite_homes = 'favorite_homes',
    membership_status = 'membership_status',
    recently_viewed = 'recently_viewed',
    timezone = 'timezone',
    zip_code = 'zip_code',
    state = 'state',
    is_active = 'is_active',
    searching_for_type = 'searching_for_type',
}
