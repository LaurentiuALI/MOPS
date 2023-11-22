import IconSearch from "../../assets/icons/icon_search.svg";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chips/Chip";
import CafeCard from "../../components/Cafe/CafeCard";
import SVGArrow from "../../components/Icons/SVGArrow";
import SVGMenu from "../../components/Icons/SVGMenu";
import SVGFilter from "../../components/Icons/SVGFilter";

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [showGoBackArrow, setShowGoBackArrow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      //? Set to 100 as a test (although it works due to the size of the navbar)
      if (window.scrollY > 100) {
        setShowGoBackArrow(true);
      } else {
        setShowGoBackArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function updateSearch(newValue: string) {
    setSearch(newValue);
  }

  function goToTopOfScreen() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="navbar">
        <header className="search">
          <SVGArrow
            title="Go back to the previous page"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className="size-p">Start a new day with a cup of coffee.</h1>
          <SVGMenu
            className="icon"
            title="Menu"
            onClick={() => {
              //! TODO - Add menu
            }}
          />
        </header>
        <Input
          className={`${search != "" ? "not-empty" : "empty"}`}
          label="Search your next coffee"
          id="search-coffee"
          type="text"
          placeholder="What shall it be?"
          value={search}
          onChange={updateSearch}
          trailingIcon={IconSearchObject}
          isPrimary={false}
        />
      </div>

      <main className="search">
        <div className="filters-container">
          <Chip isSelected onClick={() => {}}>
            Cappucino
          </Chip>
          <Chip onClick={() => {}}>Espresso</Chip>
          <Chip onClick={() => {}}>Latte</Chip>
          <SVGFilter
            className="filter-icon icon"
            title="Filter the results"
            color="var(--color-brown-dark)"
            onClick={() => {
              //! TODO - Add filter
            }}
          />
        </div>
        <div className="results-container">
          {cafeTestData.map((cafe) => {
            return (
              <CafeCard
                cafeImage={cafe.cafeImage}
                cafeName={cafe.cafeName}
                distance={cafe.distance}
                rating={cafe.rating}
                isFavorite={cafe.isFavorite}
                onClick={() => {
                  //! TODO - Add navigation
                }}
              />
            );
          })}
        </div>
      </main>
      {showGoBackArrow ? (
        <div className="go-up">
          <SVGArrow
            className="icon"
            title="Go back to the top"
            color="var(--color-brown-dark)"
            onClick={goToTopOfScreen}
          />
        </div>
      ) : null}
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

const cafeTestData = [
  {
    cafeImage: {
      src: "https://picsum.photos/200/300",
      title: "Cafe Image 1",
      alt: "Cafe 1",
    },
    cafeName: "Coffee Delight",
    distance: 250,
    rating: 4.2,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/301",
      title: "Cafe Image 2",
      alt: "Cafe 2",
    },
    cafeName: "Espresso Haven",
    distance: 148,
    rating: 4.5,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/302",
      title: "Cafe Image 3",
      alt: "Cafe 3",
    },
    cafeName: "Mocha Bliss",
    distance: 352,
    rating: 4.0,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/300",
      title: "Cafe Image 1",
      alt: "Cafe 1",
    },
    cafeName: "Coffee Delight",
    distance: 275,
    rating: 4.2,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/301",
      title: "Cafe Image 2",
      alt: "Cafe 2",
    },
    cafeName: "Espresso Haven",
    distance: 168,
    rating: 4.5,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/302",
      title: "Cafe Image 3",
      alt: "Cafe 3",
    },
    cafeName: "Mocha Bliss",
    distance: 362,
    rating: 4.0,
    isFavorite: false,
  },
  // Additional items
  {
    cafeImage: {
      src: "https://picsum.photos/200/303",
      title: "Cafe Image 4",
      alt: "Cafe 4",
    },
    cafeName: "Latte Love",
    distance: 475,
    rating: 4.8,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/304",
      title: "Cafe Image 5",
      alt: "Cafe 5",
    },
    cafeName: "Cappuccino Corner",
    distance: 230,
    rating: 4.3,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/305",
      title: "Cafe Image 6",
      alt: "Cafe 6",
    },
    cafeName: "Bean Buzz",
    distance: 358,
    rating: 4.1,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/306",
      title: "Cafe Image 7",
      alt: "Cafe 7",
    },
    cafeName: "Sugar & Spice Cafe",
    distance: 135,
    rating: 4.6,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/307",
      title: "Cafe Image 8",
      alt: "Cafe 8",
    },
    cafeName: "Java Junction",
    distance: 232,
    rating: 4.4,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/308",
      title: "Cafe Image 9",
      alt: "Cafe 9",
    },
    cafeName: "Frothy Frolic",
    distance: 420,
    rating: 4.2,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/309",
      title: "Cafe Image 10",
      alt: "Cafe 10",
    },
    cafeName: "Whipped Wonders",
    distance: 345,
    rating: 4.7,
    isFavorite: true,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/310",
      title: "Cafe Image 11",
      alt: "Cafe 11",
    },
    cafeName: "Creamy Creations",
    distance: 258,
    rating: 4.0,
    isFavorite: false,
  },
  {
    cafeImage: {
      src: "https://picsum.photos/200/311",
      title: "Cafe Image 12",
      alt: "Cafe 12",
    },
    cafeName: "Velvet Vibes",
    distance: 122,
    rating: 4.9,
    isFavorite: true,
  },
];
