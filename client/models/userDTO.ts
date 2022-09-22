import { User } from "./user";

export class UserDTO {
  full_name: string;
  email: string;
  password: string;
  profile_img_url: string;
  favorite_homes?: any[];
  membership_status: "premium" | "base";
  recently_viewed?: any[];
  timezone: string;
  zip_code: string;
  state: string;
  is_active: boolean;
  searching_for_type: "house" | "apartment";
  constructor(data: User) {
    this.full_name = data.fullName;
    this.email = data.email;
    this.password = data.password;
    this.profile_img_url = data.photoUrl;
    this.favorite_homes = data.favoriteHomes;
    this.membership_status = data.membershipStatus;
    this.recently_viewed = data.recentlyViewed;
    this.timezone = data.timezone;
    this.zip_code = data.zipcode;
    this.is_active = true;
    this.state = data.state;
    this.searching_for_type = data.housingPreference;
  }
}
