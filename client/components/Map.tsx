import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import Image from "next/image";
declare global {
  interface Window {
    initMap: () => void;
  }
}

type Props = {
  //add type annotation to homes
  markerObjects: any[];
};

function Map({ markerObjects }: Props) {
  const [icon, setIcon] = useState("");
  const [clickedId, setClickedId] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFiTLcEJG4BCZakXIbU-xYoQinKkFBUHs",
  });
  console.log({
    icon,
    clickedId,
  });
  if (!isLoaded) {
    return <div>Loading....</div>;
  }
  return (
    <div className="flex-1   ">
      {markerObjects.length && (
        <GoogleMap
          zoom={15}
          center={{
            lat: markerObjects[0].latitude,
            lng: markerObjects[0].longitude,
          }}
          mapContainerClassName="h-full w-100"
        >
          {markerObjects.map(
            (obj) =>
              obj.latitude &&
              obj.longitude && (
                <div className="h-12 w-12 object-fill">
                  <MarkerF
                    position={{ lat: obj.latitude, lng: obj.longitude }}
                    clickable
                    cursor={obj.imgSrc}
                    animation={google.maps.Animation.DROP}
                    // icon={{
                    //   url: obj.imgSrc,
                    //   size: new google.maps.Size(100, 100),
                    //   origin: new google.maps.Point(20, 20),
                    // }}
                    label={{
                      color: "white",
                      text: obj.address,
                      className: "font-bold font-3xl",
                    }}
                    key={obj.zpid}
                  />
                </div>
              )
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default Map;
