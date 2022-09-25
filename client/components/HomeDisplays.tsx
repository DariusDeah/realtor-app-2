import React, { useEffect, useState } from "react";
import { fetchProperties } from "../utils/requests";
import { SearchParams } from "../types/searchParams";
import HouseCard from "./HouseCard";
import SearchFilter from "./SearchFilter";
import Loader from "./ui/Loader";

type Props = {
  mapToggleFunction: (isToggle: boolean) => void;
  mapToggleState: boolean;
  updateHomeState: (homes: any) => void;
};

function HomeDisplays({
  mapToggleFunction,
  mapToggleState,
  updateHomeState,
}: Props) {
  const [homes, setHomes] = useState<any[]>([]);

  async function zillowApiCall(params?: SearchParams) {
    const data = await fetchProperties({
      query: {
        location: params?.location,
        minBathroom: params?.minBathroom,
        minPrice: params?.minPrice,
        minBed: params?.minBed,
        sort: params?.sort,
        homeType: params?.homeType,
      },
    });
    setHomes(data);
    updateHomeState(data);
  }

  useEffect(() => {
    zillowApiCall();
  }, []);

  return (
    <div className="md:flex-1 space-y-5  max-h-screen">
      <SearchFilter
        submitRequestFunction={zillowApiCall}
        toggleMapFunction={mapToggleFunction}
        mapToggled={mapToggleState}
      />
      <div className="flex flex-wrap   overflow-y-scroll max-h-screen m-auto ">
        {homes && homes.length ? (
          homes.map((home) => (
            <HouseCard home={home} homeImg={home.imgSrc} key={home.zpId} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default HomeDisplays;
