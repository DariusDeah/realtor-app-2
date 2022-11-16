import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { fetchProperty, fetchPropertyImages } from "../../utils/requests";
import Map from "../../components/Map";
import HouseCard from "../../components/HouseCard";
import Portal from "../../components/Portal";

type ModalProps = {
  title?: string;
  content?: any;
  btnContent?: string;
};

const Modal = ({ title, content, btnContent }: ModalProps) => {
  console.log({ content });
  console.log("clicked");
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
  const [home, setHome] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [currentImg, setCurrentImg] = useState("");

  async function fetchHome() {
    const home = await fetchProperty(homeId as string);
    setHome(home);
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
      <Modal content={<img src={currentImg} className=" rounded-lg " />} />
      <Header />
      <div className=" flex-col h-full w-full lg:m-5 ">
        <div className="w-full ">
          <div
            className="flex flex-col 
           "
          >
            <div className=" w-full  relative h-[60vh] ">
              <label htmlFor="my-modal">
                <Image
                  src={currentImg || images[0]}
                  alt="house"
                  className="lg:rounded-lg r cursor-pointer "
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  // height={500}
                  // width={700}
                />
              </label>
            </div>

            <div
              id="house-imgs__wrapper"
              className="flex  lg:flex-wrap gap-1 w-full overflow-auto scrollbar-hide lg:scrollbar-default"
            >
              {images.length &&
                images.map(
                  (image, index) =>
                    index < 80 && (
                      <div className=" ">
                        <Image
                          src={image}
                          alt="house"
                          className="rounded-lg cursor-pointer relative  "
                          layout="fixed"
                          onClick={() => {
                            setCurrentImg(image);
                          }}
                          height={150}
                          width={150}
                        />
                      </div>
                    )
                )}
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
              <p>{home.bedrooms} beds</p>
              <h1>{home.description}</h1>
            </div>

            <Map markerObjects={[home, home.nearbyHomes]} />

            {/* SCHOOLS */}
            <section className="lg:flex grid lg:space-x-7 lg:justify-center   space-y-6 lg:space-y-0 flex-grow flex-wrap">
              {home.schools.map((school: any) => (
                <div className="flex justify-center ">
                  <div className="flex justify-center">
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
