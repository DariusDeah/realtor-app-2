import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import HomeDisplays from "../components/HomeDisplays";
import Map from "../components/Map";
import { fetchProperties } from "../utils/requests";

const Search: NextPage = () => {
  const [mapToggled, setMapToggled] = useState(false);
  const [homes, setHomes] = useState(null);
  const handleMapToggle = async (isToggled: boolean) => {
    setMapToggled(isToggled);
  };

  return (
    <div className="lg:flex">
      <Header />
      <HomeDisplays
        updateHomeState={setHomes}
        mapToggleFunction={handleMapToggle}
        mapToggleState={mapToggled}
      />
      {mapToggled && homes && <Map markerObjects={homes} />}
    </div>
  );
};
export default Search;
