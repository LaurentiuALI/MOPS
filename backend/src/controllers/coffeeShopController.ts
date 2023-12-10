import CoffeeShop from "../models/coffeeShopModel";
import { Request, Response } from 'express';


// Create CoffeeShop
export const addCoffeeShop = async (req: Request, res: Response) => {
    try {
        const { Name, Geolocation, ManagerId, Coffees, Address,
                     Availabilities, ServiceType, Description, Photos } = req.body;

        // Create a new coffeeShop
        const coffeeShop = await CoffeeShop.create({
            Name,
            Geolocation, 
            ManagerId, 
            Coffees, 
            Address,
            Availabilities, 
            ServiceType, 
            Description, 
            Photos
        });

        res.status(201).json({ message: "CoffeeShop created successfully" });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error creating CoffeeShop", error });
    }
};

// Get a single cofffeshop by name
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
export const getAllCoffeeShops = async (res: Response) => {
    try {
        const coffeeShops = await CoffeeShop.find({});
        res.json(coffeeShops);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error fetching CoffeeShops", error });
    }
};

// Update user
export const updateCoffeeShop = async (req: Request, res: Response) => {
    try {
        const { Geolocation, ManagerId, Coffees, Address, Availabilities, 
            ServiceType, Description, Photos} = req.body;
        let updateData: { Geolocation?: [number]; ManagerId?: string; Coffees?: [string]; Address?: string;
                 Availabilities?: [string]; ServiceType?: string; Description?: string; Photos?: [string] } = {};

        if (Geolocation !== undefined) {
            updateData.Geolocation = Geolocation;
        }
        if (ManagerId !== undefined) {
            updateData.ManagerId = ManagerId;
        }
        if (Coffees !== undefined) {
            updateData.Coffees = Coffees;
        }
        if (Address !== undefined) {
            updateData.Address = Address;
        }
        if (Availabilities !== undefined) {
            updateData.Availabilities = Availabilities;
        }
        if (ServiceType !== undefined) {
            updateData.ServiceType = ServiceType;
        }
        if (Description !== undefined) {
            updateData.Description = Description;
        }
        if (Photos !== undefined) {
            updateData.Photos = Photos;
        }

        const updatedCoffeeShop = await CoffeeShop.findOneAndUpdate(
            { Name: req.params.name },
            updateData,
            { new: true }
        );

        if (!updatedCoffeeShop) {
            return res.status(404).json({ message: "CoffeeShop not found" });
        }
        res.json({ message: "CoffeeShop updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating CoffeeShop"});
    }
};

// Delete a CoffeeShop
export const deleteCoffeeShop = async (req: Request, res: Response) => {
    try {
        const deletedCoffeeShop = await CoffeeShop.findOneAndDelete({ Name: req.params.name });
        if (!deletedCoffeeShop) {
            return res.status(404).json({ message: "CoffeeShop not found" });
        }
        res.json({ message: "CoffeeShop deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting CoffeeShop", error });
    }
};
