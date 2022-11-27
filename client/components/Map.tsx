import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFiTLcEJG4BCZakXIbU-xYoQinKkFBUHs",
  });
  console.log({
    icon,
    clickedId,
    markerObjects,
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
          clickableIcons
          mapContainerClassName="h-[100%] w-100"
        >
          {markerObjects.map(
            (obj) =>
              obj.latitude &&
              obj.longitude && (
                <div>
                  <MarkerF
                    position={{ lat: obj.latitude, lng: obj.longitude }}
                    clickable
                    zIndex={20}
                    // cursor={obj.imgSrc}
                    animation={google.maps.Animation.DROP}
                    label={{
                      color: "black",
                      text: `${obj.address.streetAddress} - $${obj.price}`,

                      className:
                        " font-3xl bg-white p-5 rounded-lg relative mb-[100rem] ",
                      fontWeight: "bold",
                    }}
                    icon={{
                      url: "https://img.icons8.com/sf-regular/512/home.png",
                      scaledSize: new google.maps.Size(50, 50),
                    }}
                    onClick={() => router.push(`/home-details/${obj.zpid}`)}
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
