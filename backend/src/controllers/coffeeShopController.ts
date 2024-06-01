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
    const { name } = req.params;
    const updateData = req.body;

    const updatedCoffeeShop = await CoffeeShop.findOneAndUpdate(
      { Name: name, "Menu.Name": updateData.Name }, // Find the coffee shop by name and the menu item by name
      {
        $set: {
          "Menu.$.Name": updateData.Name,
          "Menu.$.Price": updateData.Price,
          "Menu.$.Quantity": updateData.Quantity,
        },
      }, // Update the matching menu item
      { new: true }
    );

    if (!updatedCoffeeShop) {
      return res
        .status(404)
        .json({ message: "CoffeeShop not found or Menu item not found" });
    }

    res.json({ message: "CoffeeShop updated successfully", updatedCoffeeShop });
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

export const addItemToMenu = async (req: Request, res: Response) => {
  try {
      const { ManagerId, Coffee } = req.body;

      if (!ManagerId || !Coffee) {
          return res.status(400).json({ message: "Please provide both ManagerId and Coffee" });
      }

      const coffeeShop = await CoffeeShop.findOne({ ManagerId: ManagerId });

      console.log(coffeeShop);

      if (!coffeeShop) {
          return res.status(404).json({ message: "Coffee shop not found" });
      }
      
      // Add the new coffee item to the menu
      coffeeShop.Menu.push(Coffee);

      await coffeeShop.save();

      res.status(200).json({ message: "Coffee added to menu successfully", updatedCoffeeShop: coffeeShop });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding coffee to menu", error });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const item = req.body; // Assuming you send the name of the item to delete in the request body

    const updatedCoffeeShop = await CoffeeShop.findOneAndUpdate(
      { "Menu._id": item._id },
      { $pull: { Menu: { Name: item.Name } } } // Remove the item from the menu array
    );

    if (!updatedCoffeeShop) {
      return res
        .status(404)
        .json({ message: "CoffeeShop not found or Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully", updatedCoffeeShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting menu item", error });
  }
};
