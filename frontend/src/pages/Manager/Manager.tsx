import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MainNavigation from "../../components/Menu/MainNavigation";
import SVGArrow from "../../components/Icons/SVGArrow";
import SVGMenu from "../../components/Icons/SVGMenu";
import SVGStar from "../../components/Icons/SVGStar";
import SVGHeart from "../../components/Icons/SVGHeart";
import SVGShare from "../../components/Icons/SVGShare";
import SVGMap from "../../components/Icons/SVGMap";
import Chip from "../../components/Chips/Chip";
import CoffeeCardRow from "../../components/CoffeeCardRow/CoffeeCardRow";
import dummyCoffeeShopImage from "../../assets/images/coffee_shop.png";
import americano from "../../assets/images/coffees/americano.png";
import black_coffee from "../../assets/images/coffees/black_coffee.png";
import cappuccino from "../../assets/images/coffees/cappuccino.png";
import hazelnut_machiato from "../../assets/images/coffees/hazelnut_machiato.png";
import cold_brew from "../../assets/images/coffees/cold_brew.png";
import flat_white from "../../assets/images/coffees/flat_white.png";
import irish_coffee from "../../assets/images/coffees/irish_coffee.png";
import latte from "../../assets/images/coffees/latte.png";
import mocha from "../../assets/images/coffees/mocha.png";
import { FaPlusCircle } from "react-icons/fa";

const coffeesAvailable = {
  0: americano,
  1: black_coffee,
  2: cappuccino,
  3: hazelnut_machiato,
  4: cold_brew,
  5: flat_white,
  6: irish_coffee,
  7: latte,
  8: mocha,
};
interface coffeeDataTypes {
  name: string;
  menu: [];
  address: string;
  availabilities: [];
  serviceType: string;
  description: string | null;
  photos: [];
}

const Manager = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(0);

  useEffect(() => {
    const managerId = params.managerId;
    const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}coffeeshop/manager/${managerId}`
        );
        setCoffeeShop(response.data);
      } catch (err) {
        setError("Failed to fetch coffee shop");
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShop();
  }, [params.managerId]);

  const handleRemoveCoffee = (index: number) => {
    setCoffeeShop((prev) => {
      if (!prev) return prev;
      const updatedCoffees = prev.Menu.filter((_, i) => i !== index);
      return { ...prev, Menu: updatedCoffees };
    });
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <>
      <MainNavigation
        isOpen={menuIsOpen}
        setIsOpen={() => setMenuIsOpen((prev) => !prev)}
      />
      <div className="w-screen bg-brand-light font-sans min-h-screen">
        <div className="bg-brand-main pb-4 rounded-b-8">
          <header className="flex justify-between pt-4 px-4 gap-2">
            <SVGArrow
              title="Go back to the previous page"
              className="self-center"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-brand-secondary text-2xl font-normal leading-8 w-full">
              {coffeeShop?.Name || "Coffee Shop"}
            </h1>
            <SVGMenu
              className="self-center"
              title="Menu"
              onClick={() => setMenuIsOpen((prev) => !prev)}
            />
          </header>
          <p className="text-brand-secondary text-sm font-normal p-4">
            {coffeeShop?.Address || "Address"}
          </p>

          <img
            src={dummyCoffeeShopImage}
            className="h-60 px-4 w-full rounded-25"
          />

          <div className="flex justify-between px-4 pt-4">
            <div className="flex gap-1 items-center">
              {coffeeShop?.rating ? (
                <>
                  <p className="text-brand-borderDark text-xs font-normal leading-150%">
                    {coffeeShop.rating}
                  </p>
                  <SVGStar title="rating icon" />
                </>
              ) : null}
            </div>

            <div className="flex gap-2 items-center">
              <SVGHeart title="heart" color="#FBF6F2" />
              <SVGShare title="share" color="#FBF6F2" />
              <SVGMap title="map" color="#FBF6F2" />
            </div>
          </div>
        </div>

        <main className="h-full bg-brand-light">
          <div className="flex gap-3 w-full items-center py-4 px-4 relative">
            {["Products", "Description", "Photos"].map((section, index) => (
              <Chip
                key={`chip-${index}`}
                selected={index === selectedChip}
                onClick={() => setSelectedChip(index)}
              >
                {section}
              </Chip>
            ))}
          </div>

          <div className="px-4 flex flex-col gap-3 pb-4">
            {selectedChip === 0 && (
              <div>
                {coffeeShop?.Menu.map((product, index) => (
                  <CoffeeCardRow
                    key={`coffeeCardRow-${index}`}
                    coffeeName={product.Name}
                    coffeeImage={
                      coffeesAvailable[Math.floor(Math.random() * 9)] ||
                      dummyCoffeeShopImage
                    }
                    price={5.0}
                    rating={4.2}
                    onRemove={() => handleRemoveCoffee(index)}
                  />
                ))}
              </div>
            )}

            {selectedChip === 1 && (
              <>
                <h2 className="text-lg font-bold leading-130% text-brand-black">
                  Description
                </h2>
                <p className="text-sm font-normal leading-150% text-brand-main">
                  {coffeeShop?.Description || "No description available"}
                </p>
              </>
            )}

            {selectedChip === 2 &&
              coffeeShop?.Photos &&
              coffeeShop.Photos.length > 0 && (
                <>
                  <h2 className="text-lg font-bold leading-130% text-brand-black">
                    Photos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {coffeeShop.Photos.map((photo, index) => (
                      <img
                        key={`photo-${index}`}
                        src={photo}
                        alt={`Coffee Shop ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                </>
              )}
          </div>
        </main>
        <FaPlusCircle
          className="fixed bottom-6 right-6 bg-brand-secondary text-brand-main w-12 h-12 flex items-center justify-center rounded-full  cursor-pointer"
          onClick={() => navigate("/add-product")}
        />
      </div>
    </>
  );
};

export default Manager;