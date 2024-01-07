import { ChangeEvent, FormEvent, useState } from "react";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import axios from "axios";
import {reviewInterface} from "./CoffeeShop";

interface formStateProps {
    listOfProducts: string[] | undefined,
    coffeeShopName: string,
    addReview: (newReview: reviewInterface) => void
}

function CoffeeReviewForm({
    listOfProducts,
    coffeeShopName,
    addReview
}: formStateProps) {

    const [formData, setFormData] = useState({
        coffee: listOfProducts != undefined? listOfProducts[0]: '',
        stars: 1,
        body: ''
    })
    const [responseMessage, setResponseMessage] = useState('')

    function handleReviewBodyChange(e: ChangeEvent<HTMLTextAreaElement>){
        setFormData((prev)=>{
            return {
                ...prev,
                body: e.target.value
            }
        })
    }

    function handleStarsChange(e: ChangeEvent<HTMLSelectElement>){
        setFormData((prev)=>{
            return {
                ...prev,
                stars: Number(e.target.value)
            }
        })
    }

    function handleCoffeeChange(e: ChangeEvent<HTMLSelectElement>){
        setFormData((prev)=>{
            const index = listOfProducts?.findIndex((item)=>{
                return item == e.target.value
            })
            return {
                ...prev,
                coffee: listOfProducts![index!]
            }
        })
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_URL}reviews/add`,{
            CoffeeShopName: coffeeShopName,
             CoffeeName: formData.coffee,
             Username:'anonim',
             Rating: formData.stars,
             Notes: formData.body
        }).then((response)=>{
            const currentDate = new Date();

            const createdReview = {
                CoffeeShopName: coffeeShopName,
                CoffeeName: formData.coffee,
                Username:'anonim',
                Rating: formData.stars,
                Notes: formData.body,
                TimeStamp: `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDay().toString().padStart(2, '0')}`
            }
            addReview(createdReview)
            resetForm() 
            setResponseMessage(response?.data.message)
        })        
    };
    function resetForm(){
        setFormData({
            ...formData,
            body: '',
            stars: 1
        }) 
    }

    return (
        <>
        <h1 className="font-bold leading-[130%] text-[20px]">Leave us a review</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col  gap-[12px]">

            <div className="flex justify-between gap-[8px]">

                <select name="product" value={formData.coffee} onChange={handleCoffeeChange} id="product" className="flex p-[12px] justify-between items-center rounded border-2 border-brand-borderDark w-full">
                    {listOfProducts != undefined && listOfProducts.map(product => 
                        <option value={product} key={product}>{product}</option>
                    )}
                </select>

                <select name="stars" id="stars" value={formData.stars} onChange={handleStarsChange} className="rounded border-2 border-brand-borderDark p-[12px]">
                    <option value={1.0}>1 ⭐</option>
                    <option value={2.0}>2 ⭐</option>
                    <option value={3.0}>3 ⭐</option>
                    <option value={4.0}>4 ⭐</option>
                    <option value={5.0}>5 ⭐</option>
                </select>

            </div>

            <textarea name="review" value={formData.body} onChange={handleReviewBodyChange} placeholder="Review content" 
                className="flex p-[12px] w-full h-[96px] gap-[8px] self-stretch rounded border-2 border-brand-borderDark"
                />

            <div className="flex gap-[8px]">
                <ButtonPrimary className="h-[45px]">Submit</ButtonPrimary>
                <ButtonSecondary className="h-[45px]" onClick={(e:HTMLFormElement)=>{
                    e.preventDefault()
                    resetForm()
                }}>Clear</ButtonSecondary>
            </div>
        </form>
        <p>{responseMessage}</p>
      </>
    );
}

export default CoffeeReviewForm;