import React from "react";
import Header from "../../components/Header";
import HouseCard from "../../components/HouseCard";
import { Homes } from "../../models/home";
import { homesListTestData, homeTestData } from "../../utils/mock-data";

type Props = {
  //   homes: Homes[];
};

function favorites({}: Props) {
  // const homes = [
  //   homeTestData,
  //   homeTestData,
  //   homeTestData,
  //   homeTestData,
  //   homeTestData,
  //   homeTestData,
  //   homeTestData,
  // ].map((home) => new Homes(home));
  const homes = homesListTestData.props.map((home) => new Homes(home));
  return (
    <div className="lg:flex">
      <Header />
      <section className=" ">
        <div className="flex flex-wrap justify-center">
          {homes.map((home) => (
            <HouseCard home={home} homeImg={home.imgSrc} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default favorites;
