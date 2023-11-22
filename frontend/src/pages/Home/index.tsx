import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import MarkerCoffee from "../../assets/icons/Marker_Coffee.svg";
import { useState } from "react";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [coord, setCoord] = useState<{ lat: number; lng: number }>({
    lat: 44.4355355,
    lng: 26.0995867,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCzYvsV3yQRFGmCPzHBNfppqUcTS4fFyDY",
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
          <div
            className="relative z-[1] top-[10px] w-[50px] h-[30px] bg-red-500"
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
            Buna
          </div>

          <GoogleMap
            mapContainerClassName="h-[800px] w-[800px]"
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
