export class Homes {
  zpid: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
  };
  imgSrc: string;
  price: string | number;
  listingStatus: string;
  hasImage: boolean;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  lotAreaValue: string;
  lotAreaUnit: string;
  latitude: string;
  longitude: string;
  primaryAgentInfo: {
    recentSales: number;
    reviewCount: number;
    name: string;
    zuid: string;
    imgSrc: string;
    ratingAvg: number;
  };
  flooring?: string[];
  yearBuilt?: string | number;
  lotSize?: string | number;
  heating?: string;
  timeOnZillow?: string | number;
  rent?: string | number;
  homeType?: string;
  appliances?: string[];
  size?: string | number;
  schools: any[];
  nearbyHomes: any[];
  description: string;

  constructor(data: any) {
    this.zpid = data.zpid;
    this.address = this.formatAddress(data.address);
    this.imgSrc = data.imgSrc;
    this.price = data.price;
    this.listingStatus = data.listingStatus;
    this.hasImage = data.hasImage;
    this.currency = data.currency;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.propertyType = data.propertyType;
    this.lotAreaValue = data.lotAreaValue;
    this.lotAreaUnit = data.lotAreaUnit;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.flooring = data.flooring;
    this.yearBuilt = data.yearBuilt;
    this.timeOnZillow = data.timeOnZillow;
    this.primaryAgentInfo =
      (data.contact_recipients && data.contact_recipients[0]) || {};
    this.primaryAgentInfo.imgSrc =
      (data.contact_recipients && data.contact_recipients[0].image_url) || "";
    this.primaryAgentInfo.name =
      (data.contact_recipients && data.contact_recipients[0].display_name) ||
      "";
    this.primaryAgentInfo.recentSales =
      (data.contact_recipients && data.contact_recipients[0].recent_sales) ||
      "";
    this.primaryAgentInfo.reviewCount =
      (data.contact_recipients && data.contact_recipients[0].review_count) ||
      "";
    this.primaryAgentInfo.zuid =
      (data.contact_recipients && data.contact_recipients[0].zuid) || "";
    this.primaryAgentInfo.ratingAvg =
      (data.contact_recipients && data.contact_recipients[0].rating_average) ||
      0;

    this.rent = `${data.rentZestimate}/mo` || "";
    this.schools = data.schools || "";
    this.nearbyHomes = data.nearbyHomes || [];
    this.description = data.description;
    this.size = data.livingArea;
  }

  private formatAddress(
    address:
      | string
      | { streetAddress: string; city: string; state: string; zipcode: string }
  ) {
    let formattedAddress;
    if (typeof address === "string") {
      return (formattedAddress = {
        streetAddress: address.split(",")[0],
        city: address.split(",")[1],
        state: address.split(",")[2],
        zipcode: address.split(",")[3],
      });
    }
    return (formattedAddress = {
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
    });
  }
}
