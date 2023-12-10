import dummyCoffeeImage from "../../assets/images/cappuccino.png";
import SVGStar from "../Icons/SVGStar";

interface CardProps {
    coffeeName: string,
    price: number,
    rating: number,
    imgSrc?: string
}
export default function CoffeeCard({coffeeName, price, rating, imgSrc = dummyCoffeeImage} : CardProps) {
    return <div className="relative flex flex-col items-center h-[220px] justify-end">
        <img src={imgSrc} alt="Cappuccino" width={146} height={133} className="absolute top-[0px]"/>

        <div className="bg-white rounded-[8px] p-[12px] w-full pt-[100px]">
            <h3 className="text-[16px] font-bold text-brand-black leading-[130%]">{coffeeName}</h3>
            <div className="flex justify-between">
                <p className="text-[14px] font-normal text-brand-main leading-[150%]">${price.toFixed(2)}</p>

                <div className="flex justify-between gap-[4px] items-center">
                    <p className="text-[14px] font-normal text-brand-main leading-[150%]">{rating.toFixed(1)}</p>
                    <SVGStar title="star" />
                </div>
            </div>
        </div>
    </div>
}