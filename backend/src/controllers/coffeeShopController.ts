import CoffeeShop from "../models/coffeeShopModel";
import { Request, Response } from "express";

// Create CoffeeShop
export const addCoffeeShop = async (req: Request, res: Response) => {
  try {
    const coffeeShopData = req.body;
    const coffeeShop = await CoffeeShop.create(coffeeShopData);
    res.status(201).json({ message: "CoffeeShop created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating CoffeeShop", error });
  }
};

// Get a single coffeeshop by name
export const getCoffeeShopByName = async (req: Request, res: Response) => {
  try {
    const coffeeShop = await CoffeeShop.findOne({ Name: req.params.name });

    if (!coffeeShop) {
      return res.status(404).json({ message: "CoffeeShop not found" });
    }
    res.status(200).json(coffeeShop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching CoffeeShop", error });
  }
};

// Get all CoffeeShops
export const getAllCoffeeShops = async (req: Request, res: Response) => {
  try {
    const coffeeShops = await CoffeeShop.find({});
    res.json(coffeeShops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching CoffeeShops", error });
  }
};

// Get CoffeeShops by coffee name
export const getCoffeeShopByCoffeeName = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("🚀 ~ req.params.CoffeeName:", req.params);
    const coffeeShops = await CoffeeShop.find({
      "Menu.Name": req.params.coffeeName,
    });
    if (!coffeeShops || coffeeShops.length === 0) {
      return res.status(404).json({ message: "CoffeeShops not found" });
    }
    res.status(200).json(coffeeShops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching CoffeeShops", error });
  }
};

// Update CoffeeShop
export const updateCoffeeShop = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const updatedCoffeeShop = await CoffeeShop.findOneAndUpdate(
      { name: req.params.name },
      updateData,
      { new: true }
    );

    if (!updatedCoffeeShop) {
      return res.status(404).json({ message: "CoffeeShop not found" });
    }
    res.json({ message: "CoffeeShop updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating CoffeeShop", error });
  }
};

// Delete a CoffeeShop
export const deleteCoffeeShop = async (req: Request, res: Response) => {
  try {
    const deletedCoffeeShop = await CoffeeShop.findOneAndDelete({
      name: req.params.name,
    });
    if (!deletedCoffeeShop) {
      return res.status(404).json({ message: "CoffeeShop not found" });
    }
    res.json({ message: "CoffeeShop deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting CoffeeShop", error });
  }
};
