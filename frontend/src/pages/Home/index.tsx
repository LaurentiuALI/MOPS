import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import MarkerCoffee from "../../assets/icons/Marker_Coffee.svg";
import { useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [markers, setMarkers] = useState<JSX.Element[]>([
    <MarkerF
      position={{ lat: 44.4346955, lng: 26.1001067 }}
      icon={MarkerCoffee}
    />,
    <MarkerF
      position={{ lat: 44.4350205, lng: 26.098955 }}
      icon={MarkerCoffee}
    />,
    <MarkerF
      position={{ lat: 44.4350205, lng: 26.09915 }}
      icon={MarkerCoffee}
    />,
  ]);

  const [coord, setCoord] = useState<{ lat: number; lng: number }>({
    lat: 44.4355355,
    lng: 26.0995867,
  });
  const key = import.meta.env.VITE_API_KEY as string;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoord({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  } else {
    console.log("Not Available");
  }

  return (
    <div className="w-screen h-screen">
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <div className="absolute">
          <Navbar />

          <div
            className="absolute z-[1] top-[160px] left-[5px] w-[100px] h-[50px] bg-brand-main text-brand-light text-center rounded-md"
            onClick={() =>
              setMarkers([
                ...markers,
                <MarkerF
                  draggable
                  position={{ lat: 44.4355355, lng: 26.0995867 }}
                  icon={MarkerCoffee}
                />,
              ])
            }
          >
            Add another Coffee Shop
          </div>
          <GoogleMap
            mapContainerClassName="h-screen w-screen absolute"
            center={coord}
            zoom={18}
          >
            {...markers}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Home;
