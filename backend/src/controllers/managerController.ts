import { Request, Response } from "express";
import CoffeeShop from "../models/coffeeShopModel"; // Adjust the path to where your model is defined

// Controller function to get coffee shop by manager ID
export const getCoffeeShopByManagerId = async (req: Request, res: Response) => {
  try {
    const coffeeShop = await CoffeeShop.findOne(
      { ManagerId: req.params.managerId.toString() },
      {}
    );

    if (!coffeeShop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }

    res.status(200).json(coffeeShop);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCoffeeShopSchedule = async(req:Request, res: Response): Promise<void>=>{
  try {
      const newSchedule = req.body.newSchedule

      const result = await CoffeeShop.updateOne({Name:req.params.coffeeName.toString()},{
          Availabilities: newSchedule
      })

      if(result) {
          res.status(200).json({
              message: "Coffee Shop schedule updated"
          })
          return
      }else{
          res.status(404).json({
              message: "Coffee Shop was not found"
          })
          return
      }
  } catch (error) {
      res.status(500).json({
          message: "Server error",
          error
      })
  }
}

export const updateCoffeeShopAddress = async(req:Request, res: Response): Promise<void>=>{
  try {
      const newAddress = req.body.newAddress
      console.log("newAddress =", newAddress);
      
      const result = await CoffeeShop.updateOne({Name:req.params.coffeeName.toString()},{
          Address: newAddress
      })

      if(result) {
          res.status(200).json({
              message: "Coffee Shop address updated",
          })
          return
      }else{
          res.status(404).json({
              message: "Coffee Shop was not found"
          })
          return
      }
  } catch (error) {
      res.status(500).json({
          message: "Server error",
          error
      })
  }
}