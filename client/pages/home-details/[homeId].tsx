import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { fetchProperty, fetchPropertyImages } from "../../utils/requests";
import Map from "../../components/Map";
import HouseCard from "../../components/HouseCard";
import Portal from "../../components/Portal";
import Loader from "../../components/ui/Loader";
import { testUser } from "../../utils/mock-user";
import FilterBadge from "../../components/ui/FilterBadge";
import { Homes } from "../../models/home";

type ModalProps = {
  title?: string;
  content?: any;
  btnContent?: any;
};

const Modal = ({ title, content, btnContent }: ModalProps) => {
  return (
    <Portal selector="#modal">
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal    bg-black bg-opacity-30   ">
        <div className="modal-box w-11/12  ">
          {title && title}
          {content && content}
          <div className="modal-action">
            {btnContent && (
              <label htmlFor="my-modal" className="btn">
                {btnContent}
              </label>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

type Props = {};

function HomeDetails({}: Props) {
  const router = useRouter();
  const { homeId } = router.query;
  const [home, setHome] = useState<Homes | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [currentImg, setCurrentImg] = useState<{
    index: number;
    image: string;
  }>({
    index: 0,
    image: images[0],
  });
  const [limit, setLimit] = useState(8);
  const user = null;

  async function fetchHome() {
    const home = await fetchProperty(homeId as string);
    setHome(home as Homes);
  }

  async function fetchHomeImages() {
    const imgs = await fetchPropertyImages(homeId as string);
    console.log({ imgs, home });
    setImages(imgs.images);
  }

  useEffect(() => {
    fetchHome();
    fetchHomeImages();
  }, []);

  return home ? (
    <div className="lg:flex  h-full  ">
      <Modal
        title={`photo ${currentImg.index + 1} of ${images.length}`}
        content={<img src={currentImg.image} className=" rounded-lg " />}
        btnContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        }
      />
      <Header />
      <div className=" flex flex-col h-full w-full lg:m-5 gap-y-10">
        <div className="w-full ">
          <div
            className="flex flex-col gap-y-5
           "
          >
            <div className=" w-full  relative h-[60vh] ">
              <label htmlFor="my-modal">
                <Image
                  src={currentImg.image || images[0]}
                  alt="house"
                  className="lg:rounded-lg  cursor-pointer "
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </label>
            </div>
            <div className=" lg:self-center">
              <div
                id="house-imgs__wrapper"
                className="flex lg:flex-wrap gap-3  w-full overflow-auto scrollbar-hide lg:scrollbar-default "
              >
                {images.length &&
                  images.map(
                    (image, index) =>
                      index < limit && (
                        <div className=" ">
                          <Image
                            src={image}
                            alt="house"
                            className="rounded-lg cursor-pointer relative  "
                            layout="fixed"
                            onClick={() => {
                              setCurrentImg({
                                index,
                                image,
                              });
                            }}
                            height={150}
                            width={150}
                          />
                        </div>
                      )
                  )}
                <div>
                  {limit < images.length ? (
                    <button
                      className="btn text-white font-semibold btn-sm btn-primary  rounded-lg h-[150px] w-[150px] "
                      onClick={() => setLimit(images.length)}
                    >
                      show all photos
                    </button>
                  ) : (
                    <button
                      className="btn text-white font-semibold btn-sm btn-primary  rounded-lg h-[150px] w-[150px] "
                      onClick={() => setLimit(8)}
                    >
                      hide photos
                    </button>
                  )}
                </div>
              </div>
            </div>
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
              {user && (
                <div className="font-semibold  space-x-2">
                  {user.user.recentlyViewed.includes(home.zpid) && (
                    <FilterBadge type="Recently Viewed" />
                  )}
                  {home.price <= user.user.housingPreferences.budget.max &&
                    home.price >= user.user.housingPreferences.budget.min && (
                      <FilterBadge type="Within Budget" />
                    )}
                  {home.bedrooms === user.user.housingPreferences.bed && (
                    <FilterBadge type="Perfect Match" />
                  )}
                  {home.price > user.user.housingPreferences.budget.max && (
                    <FilterBadge type="Over Budget" />
                  )}
                </div>
              )}
              <div className="flex lg:gap-5  w-full">
                <div className="flex items-center gap-2">
                  <p>{home.bedrooms} beds</p>
                  <img
                    src="https://img.icons8.com/sf-regular/512/bed.png"
                    alt=""
                    className="text-blue-500 lg:w-10 w-3"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p>{home.bedrooms} bathrooms</p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3106/3106471.png"
                    alt=""
                    className="text-blue-500 lg:w-8 w-3 "
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p>{home.size} sqft</p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1606/1606193.png"
                    alt=""
                    className="text-blue-500 lg:w-8 w-3"
                  />
                </div>
              </div>
              <h1>{home.description}</h1>
            </div>
          </article>

          <Map markerObjects={[home, home.nearbyHomes]} />
          {home.primaryAgentInfo && (
            <div className="flex">
              <div>
                <Image
                  src={home.primaryAgentInfo.imgSrc}
                  layout="fixed"
                  height={80}
                  width={80}
                  className="rounded-full"
                />
              </div>
              <div>
                <p>{home.primaryAgentInfo.ratingAvg}</p>
                <p>{home.primaryAgentInfo.reviewCount}</p>
                <p>{home.primaryAgentInfo.name}</p>
              </div>
            </div>
          )}
          <div className="divider"></div>
          {/* SCHOOLS */}
          <section className="lg:grid grid-cols-3 gap-5  flex flex-col justify-start items-center   ">
            {home.schools.map((school: any) => (
              <div className="flex justify-center items-center  ">
                <div className="flex justify-center w-[90%] items-center ">
                  <div
                    //find a cleaner way to write
                    // rating circle start
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
                  <div className="  border-l-2 border-spacing-3 pl-4 ">
                    <h2 className="lg:text-xl font-semibold">{school.name}</h2>
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
          <div className="divider"></div>
        </div>
        <section className="">
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
    <Loader />
  );
}

export default HomeDetails;
