import React, { useEffect, useState } from "react";
import { fetchProperties } from "../utils/requests";
import { SearchParams } from "../types/searchParams";
import HouseCard from "./HouseCard";
import SearchFilter from "./SearchFilter";
import Loader from "./ui/Loader";
import { useAppSelector } from "../redux";
import { selectUser } from "../redux/user.reducer";
import { testUser } from "../utils/mock-user";

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
  const user = testUser;
  const [params, setParams] = useState<SearchParams>(null);

  async function zillowApiCall(params?: SearchParams) {
    const data = await fetchProperties({
      query: {
        location:
          params?.location ||
          `${user.user.location.city} ${user.user.location.state}`,
        minBathroom: params?.minBathroom || user.user.housingPreferences.bath,
        minPrice: params?.minPrice || user.user.housingPreferences.budget.min,
        minBed: params?.minBed || user.user.housingPreferences.bed,
        sort: params?.sort,
        homeType: params?.homeType,
      },
    });
    setParams({
      location: `${user.user.location.city}, ${user.user.location.state}`,
    });
    setHomes(data);
    updateHomeState(data);
  }

  useEffect(() => {
    zillowApiCall();
  }, []);

  return (
    <div className="md:flex-1 flex justify-center items-center  flex-col max-[100%]  ">
      <SearchFilter
        submitRequestFunction={zillowApiCall}
        toggleMapFunction={mapToggleFunction}
        mapToggled={mapToggleState}
      />

      <div className="  overflow-y-scroll max-h-[100%]  justify-center  ">
        <div className="flex justify-start w-full ">
          {params && (
            <div className="text-xl flex gap-2">
              <h1 className="font-semibold">{homes.length} results in </h1>
              <span className="text-slate-500 underline">
                {params.location}{" "}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap h-[100vh] justify-center   ">
          {homes && homes.length ? (
            homes.map((home) => (
              <HouseCard home={home} homeImg={home.imgSrc} key={home.zpId} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeDisplays;
