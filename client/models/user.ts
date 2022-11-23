import { UserDTO } from "./userDTO";

export class User {
  id: string;
  fullName: string;
  email: string;
  photoUrl: string;
  photo: string;
  favoriteHomes?: any[];
  membershipStatus: "premium" | "base";
  recentlyViewed?: any[];
  timezone: string;
  location: {
    address: string;
    state: string;
    city: string;
    zipcode: string;
  };
  password?: string;
  housingPreferences: {
    type: string;
    budget: {
      min: number;
      max: number;
    };
    bedrooms: number;
    bathrooms: number;
  };
  constructor(data: User & UserDTO) {
    // user class can be user to convert a assorted set of user related data into a user object
    this.fullName = data.fullName || data.full_name;
    this.email = data.email;
    this.id = data.id;
    this.photoUrl = data.photoUrl || data.profile_img_url || data.photo;
    this.favoriteHomes = data.favoriteHomes || data.favorite_homes || [];
    this.membershipStatus =
      data.membershipStatus || data.membership_status || "base";
    this.recentlyViewed = data.recentlyViewed || data.recently_viewed || [];
    this.timezone = data.timezone || "";
    this.housingPreferences =
      data.housing_preferences || data.housingPreferences;
    this.location = data.location || "";
  }
}
