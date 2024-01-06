import { useNavigate } from "react-router";
import SVGArrow from "../../components/Icons/SVGArrow";
import SVGMenu from "../../components/Icons/SVGMenu";
import MainNavigation from "../../components/Menu/MainNavigation";
import SVGStar from "../../components/Icons/SVGStar";
import SVGHeart from "../../components/Icons/SVGHeart";
import SVGShare from "../../components/Icons/SVGShare";
import SVGMap from "../../components/Icons/SVGMap";
import { useEffect, useState } from "react";
import Chip from "../../components/Chips/Chip";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";
import dummyCoffeeShopImage from "../../assets/images/coffee_shop.png";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CoffeeReviewForm from "./CoffeeReviewForm";

const dummyData = {
  coffeShopName: "Magic Brew",
  address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  rating: 4.5,
  pictures: [dummyCoffeeShopImage, dummyCoffeeShopImage, dummyCoffeeShopImage],
  description: {
    title: "About Magic Brew",
    content:
      "Discover a cozy oasis at our cafe, where aromatic coffees and delectable pastries await. Enjoy a relaxing ambiance perfect for catching up with friends or savoring some alone time. Indulge in our carefully crafted beverages and treats, a delightful escape from the everyday hustle.",
  },
  schedule: {
    title: "We are serving coffee on ",
    days: [
      {
        day: "Monday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Tuesday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Wednesday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Thursday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Friday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Saturday",
        openingTime: "07:00 - 20:00",
      },
      {
        day: "Sunday",
        openingTime: "07:00 - 20:00",
      },
    ],
  },
  products: [
    {
      title: "Cappuccino",
      price: 4.35,
      rating: 4.0,
    },
    {
      title: "Flat White",
      price: 4.53,
      rating: 4.1,
    },
    {
      title: "Espresso",
      price: 4.23,
      rating: 3.2,
    },
    {
      title: "Espresso",
      price: 4.23,
      rating: 3.2,
    },
    {
      title: "Espresso",
      price: 4.23,
      rating: 3.2,
    },
  ],
};

interface reviewInterface {
  CoffeeShopName: string,
  CoffeeName: string,
  Username: string,
  Rating: number,
  Notes: string | null,
  TimeStamp: string,
}

function CoffeeShop() {
  const navigate = useNavigate();

  const pageSections = ["Products", "Description", "Schedule", "Reviews"];
  const [selectedChip, setSelectedChip] = useState<number>(0);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  interface coffeeDataTypes {
    name: string,
    coffees: [],
    address: string,
    availabilities: [],
    serviceType: string,
    description: string | null,
    photos: [],
  }
  const [coffeeShopInfo, setCoffeeShopInfo] = useState<coffeeDataTypes>();
  const [reviews, setReviews] = useState<reviewInterface[] | null>();

  const param = useParams();
  useEffect(() => {
    async function fetchData() {
      const coffeeShopDataResults = await axios.get(
        `${import.meta.env.VITE_URL}coffeeShops/${param.coffeeName}`
      )
      const coffeeShopReviewsResult = await axios.get(
        `${import.meta.env.VITE_URL}reviews`
      )

      if (coffeeShopDataResults) {
        setCoffeeShopInfo(() => {
            return {
              name: coffeeShopDataResults.data.Name,
              coffees: coffeeShopDataResults.data.Coffees,
              address: coffeeShopDataResults.data.Address,
              availabilities: coffeeShopDataResults.data.Availabilities,
              serviceType: coffeeShopDataResults.data.ServiceType,
              description: coffeeShopDataResults.data.Description,
              photos: coffeeShopDataResults.data.Photos
            }
        });
      }

      if(coffeeShopReviewsResult) {
        const coffeeShopReviews = coffeeShopReviewsResult.data.filter((review : reviewInterface)=>{
          return review.CoffeeShopName == param.coffeeName
        })
        setReviews(coffeeShopReviews);
      }

    }

    try {
      fetchData();

    } catch(error) {
      console.log(error);
    }

    return () => {}
  }, []);

  return (
    <>
      <MainNavigation
        isOpen={menuIsOpen}
        setIsOpen={() => setMenuIsOpen((prev) => !prev)}
      />
      <div className="w-screen bg-brand-light font-sans min-h-screen">
        <div className="bg-brand-main pb-[16px] rounded-b-[8px]">
          <header className="flex justify-between pt-[16px] px-[16px] gap-[8px]">
            <SVGArrow
              title="Go back to the previous page"
              className="self-center"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1 className="text-brand-secondary text-[32px] font-normal leading-8 w-full">
              {coffeeShopInfo?.name || dummyData.coffeShopName}
            </h1>
            <SVGMenu
              className="self-center"
              title="Menu"
              onClick={() => {
                setMenuIsOpen((prev) => !prev);
              }}
            />
          </header>
          <p className="text-brand-secondary text-[14px] font-normal p-[16px]">
            {coffeeShopInfo?.address || dummyData.address}
          </p>

          <img
            src={dummyData.pictures[0]}
            className="h-[240px] px-[16px] w-full rounded-[25px]"
          />

          <div className="flex justify-between px-[16px] pt-[16px]">
            <div className="flex gap-[4px] items-center">
              <p className="text-brand-borderDark text-[12px] font-normal leading-[150%]">
                {dummyData.rating}
              </p>
              <SVGStar title="rating icon" />
            </div>

            <div className="flex gap-[8px] items-center">
              <SVGHeart title="heart" color="#FBF6F2" />
              <SVGShare title="share" color="#FBF6F2" />
              <SVGMap title="map" color="#FBF6F2" />
            </div>
          </div>
        </div>

        <main className="h-full bg-brand-light">
          <div className="flex gap-[12px] w-full items-center py-[16px] px-[16px] relative">
            {pageSections.map((section, index) => (
              <Chip
              key={`chip-${index}`}
                selected={index == selectedChip}
                onClick={() => setSelectedChip(index)}
              >
                {section}
              </Chip>
            ))}
          </div>

          <div className="px-[16px] flex flex-col gap-[12px] pb-[16px]">
            {selectedChip == 0 && (
              <div className="grid grid-cols-2 gap-[16px]">
                {coffeeShopInfo?.coffees.map((product,index) => {
                  return (
                    <CoffeeCard
                    key={`coffeeCard-${index}`}
                      coffeeName={product}
                      price={5.00}
                      rating={4.2}
                    />
                  );
                })}
              </div>
            )}

            {selectedChip == 1 && (
              <>
                <h2 className="text-[20px] font-bold leading-[130%] text-brand-black">
                  {dummyData.description.title}
                </h2>
                <p className="text-[14px] font-normal leading-[150%] text-brand-main">
                  {dummyData.description.content}
                </p>
              </>
            )}

            {selectedChip == 2 && (
              <>
                <h2 className="text-[20px] font-bold leading-[130%] text-brand-black">
                  {dummyData.schedule.title}
                </h2>
                {dummyData.schedule.days.map((dayOfTheWeek,index) => (
                  <div key={`schedule-${index}`}>
                    <div className="flex justify-between w-full">
                      <p className="text-[14px] font-normal leading-[150%] text-brand-main">
                        {dayOfTheWeek.day}
                      </p>
                      <p className="text-[14px] font-normal leading-[150%] text-brand-black">
                        {dayOfTheWeek.openingTime}
                      </p>
                    </div>
                    <div className="h-[1px] w-full border border-brand-borderDark"></div>
                  </div>
                ))}
              </>
            )}

            {selectedChip == 3 && (
              <>
                <CoffeeReviewForm listOfProducts={coffeeShopInfo?.coffees} coffeeShopName={coffeeShopInfo!.name}/>

                <h2 className="font-bold ">
                  Read what our customers have to say about us
                </h2>

                {
                  reviews != null ?
                  reviews.map((review:reviewInterface)=>{
                      return (                 
                          <div key={Math.random()} className="flex p-[12px] gap-[8px] flex-col items-start bg-brand-white rounded-xl">
                            <div className="flex justify-between w-full">
                              <h3>Coffee: {review.CoffeeName}</h3>

                              <div className="flex flex-row gap-[4px]">
                                <h4 className="font-bold">{review.Rating}</h4>
                                <SVGStar title="rating icon" className="self-center" />
                              </div>
                            </div>
                            
                            <div className="flex justify-between w-full">
                              <h5 className="font-semibold">User: {review.Username}</h5>
                              <p>{review.TimeStamp.slice(0, 10)}</p>
                            </div>
                            

                            <p>{review.Notes}</p>
                          </div>
                      )
                  })
                  : null
                }

                {
                  reviews != null && 
                  (reviews.length == 0 && 
                    <p>
                      There are currently no reviews for the coffee shop. 
                    </p>
                  ) 
                }
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default CoffeeShop;
