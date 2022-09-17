export class Homes {
  zpid: string;
  address: string;
  imgSrc: string;
  price: string | number;
  listingStatus: string;
  hasImage: boolean;
  currency: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  lotAreaValue: string;
  lotAreaUnit: string;
  latitude: string;
  longitude: string;

  constructor(data: any) {
    this.zpid = data.zpid;
    this.address = data.address;
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
  }
}
