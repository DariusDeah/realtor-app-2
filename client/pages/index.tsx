import { motion, Variants } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useAppDispatch } from "../redux";
import { refreshUser } from "../redux/user.reducer";
import { homeTestData } from "../utils/mock-data";

const Footer = lazy(() => import("../components/Footer"));
const CTACard = lazy(() => import("../components/CTA-Card"));
const HouseCard = lazy(() => import("../components/HouseCard"));
const Navbar = lazy(() => import("../components/Navbar"));

const homes = [homeTestData, homeTestData, homeTestData, homeTestData];

const blockVariant = (delay: number) => {
  const cardVariants: Variants = {
    offscreen: {
      x: 300,
      visibility: "hidden",
    },
    onscreen: {
      x: 0,
      visibility: "visible",

      transition: {
        type: "spring",
        duration: 1,
        delay: delay,
      },
    },
  };
  return cardVariants;
};
type list = {
  title: string;
  subtitle: string;
  img: string;
  animationDelay: number;
  query: string;
}[];

const list: list = [
  {
    title: "Buy a home",
    subtitle: "Many homes to find for really awesome prices",
    img: "https://opendoodles.s3-us-west-1.amazonaws.com/plant.svg",
    animationDelay: 0.1,
    query: "Home",
  },
  {
    title: "Rent a place",
    subtitle: `Looking for a new place to stay? rest easy we've got you
  cover search from our 1000+ apartments and condos`,
    img: "https://opendoodles.s3-us-west-1.amazonaws.com/reading-side.svg",
    animationDelay: 0.3,
    query: "Rent",
  },
  {
    title: "Sell your place",
    subtitle: `  Looking to Sell? no sweat we making selling you home as
  easy as opening boxes`,
    img: "https://opendoodles.s3-us-west-1.amazonaws.com/unboxing.svg",
    animationDelay: 0.5,
    query: "Sell",
  },
  {
    title: "Search",
    subtitle: `  Not sure what you want? no worries take a look through our
    expansive catalogue of homes,condos, and apartments`,
    img: "https://opendoodles.s3-us-west-1.amazonaws.com/clumsy.svg",
    animationDelay: 0.7,
    query: "",
  },
];
const Home: NextPage = () => {
  const [housingPreference, setHousingPreference] = useState<string>("");
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {});
  return (
    <div className="lg:flex">
      <Header />
      <div className="lg:hidden sticky top-20 " id="nav">
        <Navbar />
      </div>

      <div className="">
        <div className=" w-full relative ">
          {/* Cover */}
          <div className=" flex gap-5 opacity-90  flex-col absolute z-50 lg:top-24 lg:right-[60%] bottom-10 right-10  lg:left-40 h-fit bg-white p-5 rounded-md ">
            <div>
              <h1 className="font-semibold text-5xl text-center">
                Search Pillow
              </h1>
              <p className=" text-lg text-center">
                we'll help you find the perfect home.
              </p>
            </div>
            <div className=" flex items-center justify-center ">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <input
                ref={addressRef}
                type="text"
                className="border-none p-1 input-ghost w-1/2"
                placeholder="enter address, city, or zip"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg">What is your housing preference? </p>
              <div className=" w-1/2 flex justify-evenly">
                <button
                  className={`btn btn-outline  btn-square ${
                    housingPreference === "Buy" && "bg-slate-800 text-white"
                  }`}
                  onClick={() => setHousingPreference("Buy")}
                >
                  Buy
                </button>
                <button
                  className={`btn btn-outline  btn-square ${
                    housingPreference === "Rent" && "bg-slate-800 text-white"
                  }`}
                  onClick={() => setHousingPreference("Rent")}
                >
                  Rent
                </button>
              </div>
            </div>
            <Link
              href={`search?pricing=${housingPreference}&location=${
                addressRef.current && addressRef.current.value
              }`}
            >
              <button className=" btn-block btn-primary btn btn-square">
                Search
              </button>
            </Link>
          </div>
          <div
            className="
          relative 
          w-full
          h-[70vh]
          "
          >
            <Image
              src="https://images.unsplash.com/photo-1517541866997-ea18e32ea9e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="hero"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
        <div className="lg:flex hidden sticky top-0" id="nav">
          <Navbar />
        </div>
        <section className="lg:space-y-3 space-y-14 lg:mx-16 mx-8  ">
          <Suspense fallback={<h1>Loading Content</h1>}>
            <div className=" lg:p-24 " id="Explore">
              <h1 className="lg:text-3xl font-semibold text-2xl  my-5 ">
                Explore All
              </h1>
              <div className=" w-full ">
                <motion.ul
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  className="flex w-full  gap-5 lg:grid grid-cols-4   lg:p-6 scroll-p-3   overflow-x-auto scrollbar-hide  "
                >
                  {list.map((item) => (
                    <CTACard
                      query={item.query}
                      key={item.title}
                      title={item.title}
                      animationDelay={item.animationDelay}
                      img={item.img}
                      subtitle={item.subtitle}
                    />
                  ))}
                </motion.ul>
              </div>
            </div>
            <div className="divider"></div>
            <div className="mx-auto lg:p-24 " id="New">
              <h1 className="lg:text-3xl font-semibold text-2xl">
                New Homes {"&"} Apartments
              </h1>
              <motion.ul
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-wrap  justify-between lg:grid grid-cols-4  scroll-p-3 space-x-2   overflow-x-auto snap-x scrollbar-hide   "
              >
                {homes.map((home, index) => (
                  <motion.li
                    variants={blockVariant(index * 0.2)}
                    className="flex overflow-x-auto"
                    key={home.zpid}
                  >
                    <HouseCard
                      home={home}
                      homeImg={home.imgSrc}
                      key={home.zpid}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className=" lg:p-24 " id="Featured">
              <h1 className="text-3xl font-semibold  underline-offset-1">
                Featured
              </h1>
              <motion.ul
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-wrap justify-between lg:grid grid-cols-4   scroll-p-3 space-x-2   overflow-x-auto snap-x scrollbar-hide   "
              >
                {homes.map((home, index) => (
                  <motion.li
                    variants={blockVariant(index * 0.2)}
                    className="flex overflow-x-auto"
                    key={home.zpid}
                  >
                    <HouseCard
                      home={home}
                      homeImg={home.imgSrc}
                      key={home.zpid}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className=" lg:p-24 " id="ForRent">
              <h1 className="text-3xl font-semibold  underline-offset-1">
                For Rent
              </h1>
              <motion.ul
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-wrap justify-between lg:grid grid-cols-4  scroll-p-3 space-x-2   overflow-x-auto snap-x scrollbar-hide   "
              >
                {homes.map((home, index) => (
                  <motion.li
                    variants={blockVariant(index * 0.3)}
                    className="flex overflow-x-auto"
                    key={home.zpid}
                  >
                    <HouseCard
                      home={home}
                      homeImg={home.imgSrc}
                      key={home.zpid}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className=" lg:p-24 " id="ForSale">
              <h1 className="text-3xl font-semibold  underline-offset-1">
                For Sale
              </h1>
              <motion.ul
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-wrap justify-between lg:grid grid-cols-4  scroll-p-3 space-x-2   overflow-x-auto snap-x scrollbar-hide   "
              >
                {homes.map((home, index) => (
                  <motion.li
                    variants={blockVariant(index * 0.3)}
                    className="flex overflow-x-auto"
                    key={home.zpid}
                  >
                    <HouseCard
                      home={home}
                      homeImg={home.imgSrc}
                      key={home.zpid}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Suspense>
        </section>
        <Suspense fallback={<div>Loading.. Footer</div>}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
