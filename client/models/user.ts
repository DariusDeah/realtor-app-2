export class User {
  id: string;
  fullName: string;
  email: string;
  photoUrl: string;
  favoriteHomes?: any[];
  membershipStatus: "premium" | "base";
  recentlyViewed?: any[];
  timezone: string;
  zipcode: string;
  state: string;
  housingPreference: "House" | "Apartment";
  constructor(data: User) {
    this.fullName = data.fullName;
    this.email = data.email;
    this.id = data.id;
    this.photoUrl = data.photoUrl || "";
    this.favoriteHomes = data.favoriteHomes || [];
    this.membershipStatus = data.membershipStatus || "base";
    this.recentlyViewed = data.recentlyViewed || [];
    this.timezone = data.timezone || "";
    this.zipcode = data.zipcode || "";
    this.state = data.state || "";
    this.housingPreference = data.housingPreference || "House";
  }
}
