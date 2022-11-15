import { User } from "./user";

export class UserDTO {
  full_name: string;
  email: string;
  password?: string;
  profile_img_url: string;
  favorite_homes?: any[];
  membership_status: "premium" | "base";
  recently_viewed?: any[];
  location?: {
    address?: string;
    state?: string;
    city?: string;
    zip_code?: string;
  };
  timezone: string;
  is_active: boolean;
  searching_for_type: "House" | "Apartment";
  constructor(data: User) {
    this.full_name = data.fullName;
    this.email = data.email;
    this.password = data.password;
    this.profile_img_url = data.photoUrl;
    this.favorite_homes = data.favoriteHomes;
    this.membership_status = data.membershipStatus;
    this.recently_viewed = data.recentlyViewed;
    this.timezone = data.timezone;
    this.is_active = true;
    this.searching_for_type = data.housingPreference;
    this.location = data.location;
    this.location.address = data.location.address;
    this.location.city = data.location.city;
    this.location.state = data.location.state;
    this.location.zip_code = data.location.zipcode;
  }
}
