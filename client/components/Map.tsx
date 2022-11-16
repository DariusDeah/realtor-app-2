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
                    icon={{
                      // url: obj.imgSrc,
                      // size: new google.maps.Size(100, 100),
                      // origin: new google.maps.Point(20, 20),
                      //  xmlns: fill:"none" viewBox:"0 0 24 24" stroke-width:"1.5" stroke:"currentColor"
                      //   <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      url: "https://img.icons8.com/sf-regular/512/home.png",
                      // path: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
                      // strokeWeight: 1.5,
                      // strokeColor: "black",
                      // anchor: new google.maps.Point(100, 100),
                      scaledSize: new google.maps.Size(50, 50),
                    }}
                    onClick={() => router.push(`/home-details/${obj.zpid}`)}
                    label={{
                      color: "black",
                      text: obj.address,
                      className:
                        " font-3xl bg-white p-5 rounded-lg border-blue-500 mb-[50rem]",
                      fontWeight: "bold",
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
