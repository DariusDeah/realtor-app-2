import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { fetchProperty } from "../../utils/requests";
import Map from "../../components/Map";
import HouseCard from "../../components/HouseCard";

type Props = {};

function HomeDetails({}: Props) {
  const [home, setHome] = useState(null);
  const router = useRouter();
  const { homeId } = router.query;
  useEffect(() => {
    async function fetchHome() {
      const home = await fetchProperty(homeId as string);
      setHome(home);
    }
    fetchHome();
  }, []);

  return home ? (
    <div className="lg:flex  h-full  ">
      <Header />
      <div className="flex flex-col h-full m-5 lg:m-10">
        <div className="">
          <div className="lg:h-2/4 lg:w-2/4 ">
            <Image
              src={home.imgSrc}
              alt="house"
              className="rounded-lg align-middle"
              layout="responsive"
              height={500}
              width={600}
            />
          </div>
          <article className=" p-5 space-y-10">
            <div>
              <h1 className="text-4xl font-bold">
                {home.address.streetAddress}{" "}
              </h1>
              <h4 className="text-2xl font-semibold">
                {home.address.city}, {home.address.state} -{" "}
                {home.address.zipcode}
              </h4>
              <p>{home.bedrooms} beds</p>
              <h1>{home.description}</h1>
            </div>
            {/* SCHOOLS */}
            <section className="lg:flex grid lg:space-x-7 lg:justify-center   space-y-6 lg:space-y-0 flex-grow flex-wrap">
              {home.schools.map((school: any) => (
                <div className="flex justify-center ">
                  <div className="flex justify-center">
                    <div
                      //find a cleaner way to write
                      // rating cirlce start
                      className={` text-center p-2  mr-2 lg:p-5 h-16 w-16 lg:h-24 lg:w-24 rounded-full text-white font-semibold ${
                        school.rating >= 8
                          ? "bg-green-500"
                          : school.rating <= 4
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      } `}
                    >
                      <h4>Rating</h4>
                      <p>{school.rating}</p>
                    </div>
                    {/* rating circle end */}
                    <div className="  border-l-2 border-spacing-3 pl-4">
                      <h2 className="lg:text-xl font-semibold">
                        {school.name}
                      </h2>
                      <div className="flex lg:text-lg">
                        <h3>grades:</h3>
                        <p>{school.grades}</p>
                      </div>
                      <div className="flex">
                        <h3>distance:</h3>
                        <p>{school.distance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            {/* SCHOOLS END */}
            <div className="overflow-auto">
              <Map markerObjects={[home, home.nearbyHomes]} />
            </div>
          </article>
        </div>
        <section className=" mt-7">
          <h1 className="text-3xl text-center ">Homes Nearby</h1>
          <div className="flex flex-row flex-wrap justify-center ">
            {home.nearbyHomes.map((nerbyHome: any) => (
              <HouseCard
                home={nerbyHome}
                key={nerbyHome.zpid}
                homeImg={nerbyHome.miniCardPhotos[0].url}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

/**
 * address:
city: "Santa Monica"
neighborhood: null
state: "CA"
streetAddress: "1447 Stanford St APT F"
zipcode: "90404"
[[Prototype]]: Object
annualHomeownersInsurance: 3776
bathrooms: 2
bedrooms: 2
brokerId: null
brokerageName: "Compass"
building: null
buildingPermits: null
city: "Santa Monica"
cityId: 26964
comingSoonOnMarketDate: null
contact_recipients: Array(1)
0:
agent_reason: 1
badge_type: "Premier Agent"
display_name: "Keri White"
image_url: "https://photos.zillowstatic.com/h_n/ISvcdnu39aoq8j0000000000.jpg"
phone: {prefix: '692', areacode: '310', number: '7951'}
rating_average: 5
recent_sales: 1
review_count: 91
zpro: null
zuid: "X1-ZUyvrrj049737t_35s1y"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
contingentListingType: null
country: "USA"
county: null
countyFIPS: "06037"
countyId: 3101
currency: "USD"
datePosted: "2022-08-16"
dateSold: "2018-05-14"
description: "Stylish Mid-Century Modern Condo is located on a quiet, tree-lined street.  Tucked inside this small and private gated complex is this beautifully remodeled top floor condo with tons of natural light. Immaculately remodeled kitchen and bathroom, stylish fixtures, newer floors, plenty of closet space, smart home features and a private patio.  The condo also features generous storage, in-unit laundry, a private 1-car garage, skylights in each bathroom, low HOA dues, and a new energy-efficient roof. Close to the beach, 3rd street promenade, and West LA."
favoriteCount: 78
homeFacts: null
homeStatus: "FOR_SALE"
homeType: "CONDO"
imgSrc: "https://photos.zillowstatic.com/fp/7fd28a3b98dfa6509934f2b2cc796117-p_d.jpg"
isListedByOwner: false
latitude: 34.035576
listed_by: {agent_reason: 3, zpro: true, recent_sales: 3, review_count: 28, display_name: 'Taya DiCarlo', …}
listingProvider: null
livingArea: 1030
livingAreaUnits: "sqft"
livingAreaValue: 1030
longitude: -118.46912
mlsid: "SB22161565"
monthlyHoaFee: 309
mortgageRates:
arm5Rate: 4.759
fifteenYearFixedRate: 4.24
thirtyYearFixedRate: 5.013
[[Prototype]]: Object
nearbyHomes: Array(8)
0:
address: {city: 'Santa Monica', state: 'CA', streetAddress: '1447 Stanford St', zipcode: '90404'}
currency: "USD"
homeStatus: "OTHER"
homeType: "APARTMENT"
latitude: 34.035576
longitude: -118.46912
miniCardPhotos: [{…}]
price: 0
zpid: 2087323649
[[Prototype]]: Object
1: {miniCardPhotos: Array(1), zpid: 68987924, longitude: -118.46912, address: {…}, price: 540000, …}
2: {miniCardPhotos: Array(1), zpid: 68987925, longitude: -118.46912, address: {…}, price: 918400, …}
3: {miniCardPhotos: Array(1), zpid: 68987926, longitude: -118.46912, address: {…}, price: 1080400, …}
4: {miniCardPhotos: Array(1), zpid: 68987927, longitude: -118.46912, address: {…}, price: 850000, …}
5: {miniCardPhotos: Array(1), zpid: 68987928, longitude: -118.46912, address: {…}, price: 835000, …}
6: {miniCardPhotos: Array(1), zpid: 68987929, longitude: -118.46912, address: {…}, price: 1088300, …}
7: {miniCardPhotos: Array(1), zpid: 68987931, longitude: -118.46912, address: {…}, price: 494871, …}
length: 8
[[Prototype]]: Array(0)
pageViewCount: 988
price: 899000
priceHistory: Array(7)
0:
attributeSource: {infoString2: 'CRMLS', infoString3: 'https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg', infoString1: 'SB22161565'}
buyerAgent: null
date: "2022-08-16"
event: "Listed for sale"
postingIsRental: false
price: 899000
priceChangeRate: 0.22312925170068
pricePerSquareFoot: 873
sellerAgent: null
showCountyLink: false
source: "CRMLS"
time: 1660608000000
[[Prototype]]: Object
1: {priceChangeRate: 0.22704507512521, date: '2018-05-14', source: 'Public Record', postingIsRental: false, time: 1526256000000, …}
2: {priceChangeRate: 0, date: '2013-10-01', source: 'CLAW', postingIsRental: false, time: 1380585600000, …}
3: {priceChangeRate: 0, date: '2013-08-21', source: 'Coldwell Banker Residential Brokerage - Venice', postingIsRental: false, time: 1377043200000, …}
4: {priceChangeRate: 0.15748792270531, date: '2013-07-20', source: 'Coldwell Banker Residential Brokerage - Venice', postingIsRental: false, time: 1374278400000, …}
5: {priceChangeRate: -0.1213921901528, date: '2010-05-27', source: 'Public Record', postingIsRental: false, time: 1274918400000, …}
6: {priceChangeRate: 0, date: '2005-07-01', source: 'Public Record', postingIsRental: false, time: 1120176000000, …}
length: 7
[[Prototype]]: Array(0)
propertyTaxRate: 0.77
propertyTypeDimension: "Condo"
providerListingID: null
rentZestimate: 3366
resoFacts: {hasAttachedProperty: true, frontageType: null, poolFeatures: Array(1), flooring: Array(4), foundationDetails: {…}, …}
schools: Array(3)
0:
assigned: null
distance: 0.5
grades: "K-5"
isAssigned: true
level: "Elementary"
link: "https://www.greatschools.org/school?id=02926&state=CA"
name: "McKinley Elementary School"
rating: 8
size: 475
studentsPerTeacher: 19
totalCount: 1
type: "Public"
[[Prototype]]: Object
1:
assigned: null
distance: 1.4
grades: "6-8"
isAssigned: true
level: "Middle"
link: "https://www.greatschools.org/school?id=02924&state=CA"
name: "Lincoln Middle School"
rating: 8
size: 1102
studentsPerTeacher: 22
totalCount: 1
type: "Public"
[[Prototype]]: Object
2:
assigned: null
distance: 1.8
grades: "9-12"
isAssigned: true
level: "High"
link: "https://www.greatschools.org/school?id=02932&state=CA"
name: "Santa Monica High School"
rating: 8
size: 2857
studentsPerTeacher: 32
totalCount: 1
type: "Public"
[[Prototype]]: Object
length: 3
[[Prototype]]: Array(0)
solarPotential: {sunScore: 88.15, solarFactor: 2, buildFactor: 73.6, climateFactor: 7.14, electricityFactor: 5.42}
state: "CA"
stateId: 9
streetAddress: "1447 Stanford St APT F"
taxHistory: (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
timeOnZillow: "2 days"
timeZone: "America/Los_Angeles"
url: "/homedetails/1447-Stanford-St-APT-F-Santa-Monica-CA-90404/68987930_zpid/"
yearBuilt: 1967
zestimate: 912520
zestimateHighPercent: "5"
zestimateLowPercent: "5"
zipcode: "90404"
zpid: 68987930
 */
export default HomeDetails;
