import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import SVGStar from "../Icons/SVGStar";
import axios from "axios";

type IMenuItem = {
  Name: string;
  Price: number;
  Quantity: number;
};

interface CoffeeCardRowProps {
  coffeeShopName: string;
  product: IMenuItem;
  coffeeImage: string;
  onRemove: () => void;
}

const CoffeeCardRow: React.FC<CoffeeCardRowProps> = ({
  coffeeShopName,
  product,
  onRemove,
}) => {
  const [itemQuantity, setItemQuantity] = useState<IMenuItem>(product);
  const [coffeePhoto, setCoffeePhoto] = useState<string>("");

  const increaseQuantity = async () =>
    setItemQuantity((prev) => ({ ...prev, Quantity: prev?.Quantity + 1 }));
  const decreaseQuantity = () =>
    setItemQuantity((prev) => ({ ...prev, Quantity: prev.Quantity - 1 }));

  useEffect(() => {
    const getPhoto = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_URL}coffees/${product.Name}`
        );
        setCoffeePhoto(result.data.Image);
        console.log("🚀 ~ getPhoto ~ result:", result.data.Image);
      } catch (err) {
        console.log("Failed to find photo");
      }
    };

    getPhoto();

    const updateQuantityOnServer = async () => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_URL}coffeeShops/${coffeeShopName}`,
          { ...itemQuantity }
        );
      } catch (err) {
        console.log("Failed to update quantity on the server");
      }
    };

    updateQuantityOnServer();
  }, [itemQuantity, coffeeShopName, product.Name]);

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="w-1/5">
        <img
          src={coffeePhoto}
          alt={product.Name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-4/5 flex flex-col justify-between pl-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold flex justify-between">
            {product.Name}
          </h3>
          <h3 className="text-lg font-bold flex justify-between">
            {5}
            <SVGStar title="rating icon" className="ml-2 self-center h-4 w-4" />
          </h3>
        </div>
        <p className="text-gray-700">Price: ${product.Price.toFixed(2)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaMinusCircle
              className={
                itemQuantity.Quantity > 1
                  ? "text-gray-600 h-6 w-6"
                  : "text-gray-200 h-6 w-6"
              }
              onClick={decreaseQuantity}
            />
            <span>{itemQuantity.Quantity}</span>
            <FaPlusCircle
              className=" text-gray-600 h-6 w-6"
              onClick={increaseQuantity}
            />
          </div>
          <TiDelete
            className="hover:text-red-700 text-red-500 h-10 w-10 "
            onClick={onRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default CoffeeCardRow;
