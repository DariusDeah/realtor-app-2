import React from "react";
import Header from "../../components/Header";
import HouseCard from "../../components/HouseCard";
import { Homes } from "../../models/home";
import { homeTestData } from "../../utils/mock-data";

type Props = {
  //   homes: Homes[];
};

function favorites({}: Props) {
  const homes = [
    homeTestData,
    homeTestData,
    homeTestData,
    homeTestData,
    homeTestData,
    homeTestData,
    homeTestData,
  ];
  return (
    <div className="lg:flex">
      <Header />
      <section>
        <div className="flex lg:grid lg:grid-cols-4 flex-wrap justify-center">
          {homes.map((home) => (
            <HouseCard home={home} homeImg={home.imgSrc} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default favorites;
