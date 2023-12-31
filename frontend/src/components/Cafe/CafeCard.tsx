import IconStar from "../../assets/icons/icon_rating_star.svg";
import IconNotFavorite from "../../assets/icons/icon_heart_not_favorite.svg";
import IconFavorite from "../../assets/icons/icon_heart_favorite.svg";
import { useEffect, useState } from "react";
import axios from "axios";

interface CafeCardProps {
  cafeImage: {
    src: string;
    title: string;
    alt: string;
  };
  cafeName: string;
  distance: number;
  rating?: number,
  isFavorite: boolean;
  onClick: () => void;
}

export default function CafeCard({
  cafeImage,
  cafeName,
  distance,
  isFavorite,
  onClick,
}: CafeCardProps) {

  const [toggleFavorite, setToggleFavorite] = useState(isFavorite);
  const [existingRating, setExistingRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const calculatedRating = await axios.get(
        `${import.meta.env.VITE_URL}reviews/rating/${cafeName}`
      ).catch((error)=>{
        error
      })

      if (calculatedRating) {
        setExistingRating(calculatedRating.data.AverageRating);
      }
    }

      fetchData();
      return () => {}
  },[cafeName]);


  return (
    <div
      className="bg-white rounded-[12px] p-[12px] relative flex flex-col justify-between"
      onClick={onClick}
    >
      <img
        className="absolute end-[8px]"
        height={24}
        src={toggleFavorite ? IconFavorite : IconNotFavorite}
        title="favorite"
        alt="favorite"
        onClick={(event) => {
          event.stopPropagation();
          setToggleFavorite((prev) => !prev);
        }}
      />
      <img
        className="w-full rounded-[8px] h-[80px] "
        src={cafeImage.src}
        title={cafeImage.title}
        alt={cafeImage.alt}
      />
      <div className="font-bold text-[16px] leading-[130%] my-[8px]">
        {cafeName}
      </div>
      <div className="flex justify-between">
        <p>{distance}m</p>
        <p className="flex">
          <span>{existingRating != 0 && existingRating.toFixed(1)}</span>
          {existingRating !=0 && <img src={IconStar} title="rating" alt="rating" />}
        </p>
      </div>
    </div>
  );
}
