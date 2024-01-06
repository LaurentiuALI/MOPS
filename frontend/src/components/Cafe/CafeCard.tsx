import IconStar from "../../assets/icons/icon_rating_star.svg";
import IconNotFavorite from "../../assets/icons/icon_heart_not_favorite.svg";
import IconFavorite from "../../assets/icons/icon_heart_favorite.svg";
import { useState } from "react";

interface CafeCardProps {
  cafeImage: {
    src: string;
    title: string;
    alt: string;
  };
  cafeName: string;
  distance: number;
  rating: number;
  isFavorite: boolean;
  onClick: () => void;
}

export default function CafeCard({
  cafeImage,
  cafeName,
  distance,
  rating,
  isFavorite,
  onClick,
}: CafeCardProps) {
  const [toggleFavorite, setToggleFavorite] = useState(isFavorite);


  return (
    <div
      className="bg-white rounded-[12px] p-[12px] relative"
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
          <span>{rating.toFixed(1)}</span>
          <img src={IconStar} title="rating" alt="rating" />
        </p>
      </div>
    </div>
  );
}
