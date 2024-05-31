import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import SVGStar from "../Icons/SVGStar";

interface CoffeeCardRowProps {
  coffeeName: string;
  coffeeImage: string;
  price: number;
  rating: number;
  onRemove: () => void;
}

const CoffeeCardRow: React.FC<CoffeeCardRowProps> = ({
  coffeeName,
  coffeeImage,
  price,
  rating,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="w-1/5">
        <img
          src={coffeeImage}
          alt={coffeeName}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-4/5 flex flex-col justify-between pl-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold flex justify-between">
            {coffeeName}
          </h3>
          <h3 className="text-lg font-bold flex justify-between">
            {rating}
            <SVGStar title="rating icon" className="ml-2 self-center h-4 w-4" />
          </h3>
        </div>
        <p className="text-gray-700">Price: ${price.toFixed(2)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaMinusCircle
              className={
                quantity > 1 ? "text-gray-600 h-6 w-6" : "text-gray-200 h-6 w-6"
              }
              onClick={decreaseQuantity}
            />
            <span>{quantity}</span>
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
