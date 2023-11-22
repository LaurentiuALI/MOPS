import IconStar from "../../assets/icons/icon_rating_star.svg";
import IconNotFavorite from "../../assets/icons/icon_heart_not_favorite.svg";
import IconFavorite from "../../assets/icons/icon_heart_favorite.svg";

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
  cafeImage = {
    src: "https://picsum.photos/200",
    title: "cafe",
    alt: "cafe",
  },
  cafeName = "Magic Brews",
  distance = 240,
  rating = 4.5,
  isFavorite = false,
  onClick = () => {},
}: CafeCardProps) {
  return (
    <div className="cafe-card">
      <img
        className="cafe-card-favorite-icon icon"
        src={isFavorite ? IconFavorite : IconNotFavorite}
        title="favorite"
        alt="favorite"
        onClick={onClick}
      />
      <img
        className="cafe-card-image"
        src={cafeImage.src}
        title={cafeImage.title}
        alt={cafeImage.alt}
      />
      <p className="h4">{cafeName}</p>
      <div className="cafe-card-details-container">
        <p>{distance}m</p>
        <p>
          <span>{rating.toFixed(1)}</span>
          <img src={IconStar} title="rating" alt="rating" />
        </p>
      </div>
    </div>
  );
}
