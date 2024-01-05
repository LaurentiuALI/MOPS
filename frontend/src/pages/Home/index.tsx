import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import MarkerCoffee from "../../assets/icons/Marker_Coffee.svg";
import Navbar from "./Navbar";
import axios from "axios";

interface coffeeShop {
  Name: string;
  Geolocation: [number, number];
  ManagerId: number;
  Coffees: [string];
  Address: string;
  Availabilities: [string];
  ServiceType: string;
  Description: string;
  Photos: [string];
}

const Home = () => {
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const addMarker = (lat: number, long: number) => {
    setMarkers((markers) => [
      ...markers,
      <MarkerF
        draggable
        position={{ lat: lat, lng: long }}
        icon={MarkerCoffee}
      />,
    ]);
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}coffeeShops`).then((response) => {
      response.data.map((item: coffeeShop) => {
        addMarker(item.Geolocation[0], item.Geolocation[1]);
      });
    });
  }, []);

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
