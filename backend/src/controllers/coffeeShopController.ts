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

