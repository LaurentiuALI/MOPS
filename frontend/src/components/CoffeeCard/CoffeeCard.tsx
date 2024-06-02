import { useEffect, useState } from "react";
import SVGStar from "../Icons/SVGStar";
import axios from "axios";

interface CardProps {
  coffeeName: string;
  price: number;
  rating: number;
  quantity: number;
  imgSrc?: string;
}

export default function CoffeeCard({
  coffeeName,
  price,
  rating,
  quantity,
}: CardProps) {
  const [coffeePhoto, setCoffeePhoto] = useState<string>("");

  useEffect(() => {
    const getPhoto = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_URL}coffees/${coffeeName}`
        );
        setCoffeePhoto(result.data.Image);
        console.log("🚀 ~ getPhoto ~ result:", result.data.Image);
      } catch (err) {
        console.log("Failed to find photo");
      }
    };
    getPhoto();
  }, [coffeeName]);

  return (
    <div className="relative flex flex-col items-center h-[220px] justify-end">
      <img
        src={coffeePhoto}
        alt="coffee expectations"
        width={146}
        height={133}
        className="absolute top-[0px] h-[133px] w-[140px]"
      />

      <div className="bg-white rounded-[8px] p-[12px] w-full pt-[100px]">
        <div className=" flex flex-col justify-between">
          <h3 className="text-[16px] font-bold text-brand-black leading-[130%]">
            {coffeeName}
          </h3>
          {quantity < 4 && (
            <h3 className="flex justify-end m-1 text-[14px] font-bold text-brand-red leading-[130%]">
              only {quantity} left
            </h3>
          )}
        </div>
        <p className="text-[14px] font-normal text-brand-main leading-[150%]"></p>
        <div className="flex justify-between">
          <p className="text-[14px] font-normal text-brand-main leading-[150%]">
            ${price.toFixed(2)}
          </p>

          <div className="flex justify-between gap-[4px] items-center">
            <p className="text-[14px] font-normal text-brand-main leading-[150%]">
              {rating.toFixed(1)}
            </p>
            <SVGStar title="star" />
          </div>
        </div>
      </div>
    </div>
  );
}
