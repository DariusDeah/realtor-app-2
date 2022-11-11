import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { fetchProperty } from "../../utils/requests";
import Map from "../../components/Map";
import HouseCard from "../../components/HouseCard";

type Props = {};

function HomeDetails({}: Props) {
  const [home, setHome] = useState<any>(null);
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
            <Map markerObjects={[home, home.nearbyHomes]} />
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
export default HomeDetails;
