export class Home {
    zpid: string;
    address: string;
    imgSrc: string;
    price: string | number;
    listing_status: string;
    hasImage: boolean;
    currency: string;
    bedrooms: string;
    bathrooms: string;
    property_type: string;
    lot_area_unit: string;
    creator_id: string;

    constructor(data: any) {
        this.zpid = data.zpid;
        this.address = data.address;
        this.imgSrc = data.imgSrc;
        this.price = data.price;
        this.listing_status = data.listingStatus;
        this.hasImage = data.hasImage;
        this.currency = data.currency;
        this.bedrooms = data.bedrooms;
        this.bathrooms = data.bathrooms;
        this.property_type = data.propertyType;
        this.lot_area_unit = data.lotAreaUnit;
        this.creator_id = '';
    }
}
