import IconSearch from "../../assets/icons/icon_search.svg";
import Input from "../Search/Input/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chips/Chip";
import CafeCard from "../../components/Cafe/CafeCard";
import SVGArrow from "../../components/Icons/SVGArrow";
import SVGMenu from "../../components/Icons/SVGMenu";
import SVGFilter from "../../components/Icons/SVGFilter";
import MainNavigation from "../../components/Menu/MainNavigation";
import axios from "axios";
import getDistance from "geolib/es/getPreciseDistance";
import { useLocationStore } from "../../store/locationStore";
import Loading from "../../components/Loading/Loading";

import dummyCoffeeShopImage from "../../assets/images/coffee_shop.png";
import coffeeMachines from "../../assets/images/coffee_machines_and_barista.jpg";
import modernCafe from "../../assets/images/modern_cafe.jpg";
import retroCafe from "../../assets/images/retro_cafe.jpg";
import tableAtCafe from "../../assets/images/table_at_cafe.jpg";
import barista from "../../assets/images/barista.jpg";

type IMenuItem = {
  Name: string;
  Price: number;
  Quantity: number;
};

type ICoffeeShop = {
  Name: string;
  Geolocation: [number, number];
  ManagerId: number;
  Menu: [IMenuItem];
  Address: string;
  Availabilities: [string];
  ServiceType: string;
  Description: string;
  Photos: [string];
};

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [distanceSet, setDistanceSet] = useState(false);
  const [coffeeShops, setCoffeeShops] = useState<[ICoffeeShop] | []>();

  const [listOfChipsSize, setListOfChipsSize] = useState(14); // 14px
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const { latitude, longitude } = useLocationStore();

  const dummyPictureOfCafe = [
    dummyCoffeeShopImage,
    coffeeMachines,
    modernCafe,
    retroCafe,
    tableAtCafe,
    barista,
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}coffeeShops`)
      .then((response) => {
        setCoffeeShops(response.data);
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const fetchCoffe = async () => {
      const result = await axios
        .get(`${import.meta.env.VITE_URL}coffeeShops/byCoffee/${search}`)
        .catch((error) => {
          console.log(error);
        });

      if (result) {
        setCoffeeShops(result.data);
      } else {
        setCoffeeShops([]);
      }
    };

    try {
      if (search.length > 0) {
        fetchCoffe();
      }
    } catch (error) {
      console.log(error);
    }

    setDataIsLoading(false);

    // cleanup function
    return () => {};
  }, [search]);

  interface CoffeeType {
    name: string;
    isSelected: boolean;
  }
  const [chips] = useState<CoffeeType[]>([
    {
      name: "Cappuccino",
      isSelected: false,
    },
    {
      name: "Latte",
      isSelected: false,
    },
    {
      name: "Mocha",
      isSelected: false,
    },
    {
      name: "Cold Brew",
      isSelected: false,
    },
    {
      name: "Americano",
      isSelected: false,
    },
    {
      name: "Irish Coffee",
      isSelected: false,
    },
    {
      name: "Flat White",
      isSelected: false,
    },
    {
      name: "Hazelnut Macchiato",
      isSelected: false,
    },
    {
      name: "Black Coffee",
      isSelected: false,
    },
  ]);

  function updateSearch(newValue: string) {
    setSearch(newValue);
  }

  return (
    <>
      <MainNavigation
        isOpen={dialogIsOpen}
        setIsOpen={() => setDialogIsOpen(false)}
      />
      <div className="w-screen h-full bg-brand-secondary font-sans">
        <div className="bg-brand-main pb-[16px] rounded-b-[8px]">
          <header className="flex justify-between pt-[16px] px-[16px] gap-[8px]">
            <SVGArrow
              title="Go back to the previous page"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1 className="text-brand-secondary text-[14px] font-normal leading-5 w-full">
              Start a new day with a cup of coffee.
            </h1>
            <SVGMenu
              className="icon"
              title="Menu"
              onClick={() => {
                setDialogIsOpen((prev) => {
                  console.log(
                    (
                      document.getElementsByTagName(
                        "dialog"
                      ) as unknown as HTMLDialogElement[]
                    )[0].clientWidth
                  );
                  return !prev;
                });
              }}
            />
          </header>
          <Input
            className="m-[16px] flex gap-[8px]"
            label="Search your next coffee"
            id="search-coffee"
            type="text"
            placeholder="What shall it be?"
            value={search}
            onChange={updateSearch}
            labelClass="bg-brand-main text-brand-secondary"
            bgColor="bg-brand-main"
            trailingIcon={IconSearchObject}
            isBgDark={true}
          />
        </div>
        <main className="h-full bg-brand-secondary">
          <div
            className={`flex flex-wrap gap-[12px] w-full items-center pt-[16px] px-[16px] relative overflow-hidden h-${listOfChipsSize}`}
          >
            {chips.map((chip, index) => (
              <Chip
                key={`chip-${index}`}
                className="min-w-[25%]"
                selected={chip.name == search}
                // onClick={() => {
                //   if (!chip.isSelected)
                //     axios
                //       .get(
                //         `${import.meta.env.VITE_URL}coffeeShops/byCoffee/${
                //           chip.name
                //         }`
                //       )
                //       .then((response) => {
                //         console.log(response.data);
                //         setCoffeeShops(response.data);
                //       });
                //   else if (chip.isSelected) {
                //     axios
                //       .get(`${import.meta.env.VITE_URL}coffeeShops`)
                //       .then((response) => {
                //         console.log(response.data);
                //         setCoffeeShops(response.data);
                //       });
                //   }
                //   setChips((prev) => {
                //     const nextChips = [...prev];
                //     nextChips[index] = {
                //       name: chip.name,
                //       isSelected: !chip.isSelected,
                //     };
                //     return nextChips;
                //   });
                // }}
                onClick={() => {
                  updateSearch(chip.name);
                }}
              >
                {chip.name}
              </Chip>
            ))}
            <Chip
              selected={distanceSet}
              onClick={() => {
                setDistanceSet(!distanceSet);
              }}
            >
              500m
            </Chip>

            <SVGFilter
              className="absolute end-[16px] top-[20px]"
              title="Filter the results"
              color="#222"
              onClick={() => {
                setListOfChipsSize((prev) => {
                  if (prev == 14) return 13;
                  else return 14;
                });
              }}
            />
          </div>

          <div className="mt-[16px] grid grid-cols-2 pb-[16px] px-[16px] gap-[16px]">
            {dataIsLoading && <Loading />}

            {!dataIsLoading &&
              coffeeShops &&
              coffeeShops.map((cafe) => {
                const distance = getDistance(
                  { latitude: latitude, longitude: longitude },
                  {
                    latitude: cafe.Geolocation[0],
                    longitude: cafe.Geolocation[1],
                  }
                );
                if (distanceSet && distance < 500)
                  return (
                    <CafeCard
                      key={`${cafe.Name}${Math.random}`}
                      cafeImage={{
                        src: dummyPictureOfCafe[
                          Math.floor(
                            Math.random() * (dummyPictureOfCafe.length - 1)
                          )
                        ],
                        alt: "Coffee Shop Interior",
                        title: "Main Image for Coffee Shop",
                      }}
                      cafeName={cafe.Name}
                      distance={distance}
                      isFavorite={false}
                      onClick={() => {
                        navigate(`./${cafe.Name}`);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                      }}
                    />
                  );
                else if (!distanceSet)
                  return (
                    <CafeCard
                      key={`${cafe.Name}${Math.random}`}
                      cafeImage={{
                        src: dummyPictureOfCafe[
                          Math.floor(
                            Math.random() * (dummyPictureOfCafe.length - 1)
                          )
                        ],
                        alt: "Coffee Shop Interior",
                        title: "Main Image for Coffee Shop",
                      }}
                      cafeName={cafe.Name}
                      distance={distance}
                      isFavorite={false}
                      onClick={() => {
                        navigate(`./${cafe.Name}`);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                      }}
                    />
                  );
              })}
          </div>
        </main>
      </div>
    </>
  );
}

const IconSearchObject = {
  src: IconSearch,
  title: "Search",
  alt: "Search icon",
  onClick: () => {
    //! TODO - Add search
  },
};
