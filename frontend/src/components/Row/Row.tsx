import { useState } from 'react';
import SVGPen from '../Icons/SVGPen';
import axios from 'axios';
import SVGCheck from '../Icons/SVGCheck';

type RowProps = {
    coffeeShop: ICoffeeShop
   scheduleData: {workDay: string; openingHour:string;closingHour:string},
   index: number
}

function Row({coffeeShop, scheduleData, index}:RowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [openingHours, setOpeningHours] = useState<string>(scheduleData.openingHour)
  const [closingHours, setClosingHours] = useState<string>(scheduleData.closingHour)
  return (
    <div>
                    <div className="flex justify-between w-full">
                      <p className="text-[14px] font-normal leading-[150%] text-brand-main w-full">
                        {scheduleData.workDay}
                      </p>
                      <p className="w-full">{isEditing ? <input type='text' className='inline' onChange={(e)=>{
                          setOpeningHours(e.target.value)
                        }} value={openingHours}/> : (
                        <span onClick={()=>setIsEditing(true)}>{openingHours}</span>)}
                        {' '}-{' '}
                        {isEditing ? <input type='text' className='inline' onChange={(e)=>{
                          setClosingHours(e.target.value)
                        }} value={closingHours}/> : (<span>{closingHours}</span>)}</p>
                      {
                        isEditing ? (
                          <SVGCheck className="w-[32px]" title='save' onClick={()=>{
                           
                              // update
                              const newSchedule =[...coffeeShop.Availabilities]
                              newSchedule[index] = {
                                workDay: scheduleData.workDay,
                                openingHour: openingHours,
                                closingHour: closingHours,
                              }
                              axios.put(`${import.meta.env.VITE_URL}coffeeshop/manager/${coffeeShop.Name}/schedule`,{
                                newSchedule: newSchedule
                              }).then(data=>{
                                console.log(data);
                                setIsEditing(false)
                              }).catch(error=>{
                                console.log(error);
                                
                              })
                          }} />
                        ) : (
                          <SVGPen className="w-[32px]" title="edit" onClick={
                            ()=>{
                                  const element = document.getElementById(`schedule-${index}-opening`)
                                  element?.focus()
                                  setIsEditing(true)
                            }
                          } />
                        )
                      }
                    </div>
                    <div className="h-[1px] w-full border border-brand-borderDark"></div>
                  </div>
  )
}

export default Row

type IMenuItem = {
    Name: string;
    Price: number;
    Quantity: number;
  };
  
  type ICoffeeShop = {
    Name: string;
    Geolocation: [number, number];
    ManagerId: number;
    Menu: [IMenuItem];
    Address: string;
    Availabilities: [{workDay: string, openingHour:string,closingHour:string}];
    ServiceType: string;
    Description: string;
    Photos: [string];
  };

