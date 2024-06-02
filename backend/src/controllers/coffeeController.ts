import Coffee from "../models/coffeeModel";
import { Request, Response } from 'express';
import cloudinary from '../cloudinary';
import { MongoError } from "mongodb";

// Create coffee
export const addCoffee = async (req: Request, res: Response) => {
    try {
        const { Name, Ingredients, Description, Allergens } = req.body;
        const file = req.file; // Assuming you are using multer to handle file uploads

        if (!Name) {
            return res.status(400).json({ message: "Please provide coffee's name" });
        }

        let imageUrl = '';
        if (file) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'coffees', // Folder in Cloudinary to store images
            });
            imageUrl = result.secure_url;
            console.log(imageUrl);
        }

        // Create a new coffee
        const coffee = await Coffee.create({
            Name,
            Ingredients,
            Description,
            Allergens,
            Image: imageUrl,
        });

        res.status(201).json({ message: "Coffee created successfully", coffee });
    } catch (error) {
        if((error as MongoError).code == 11000){
            res.status(201).json({ message: "Coffee already exists" });
            return
        }
        console.error(error);
        res.status(500).json({ message: "Error creating coffee", error });
    }
};

// Get a single coffee by coffee name
export const getCoffeeByName = async (req: Request, res: Response) => {
    try {
        const coffee = await Coffee.findOne({ Name: req.params.name });
        if (!coffee) {
            return res.status(404).json({ message: "Coffee not found" });
        }
        res.json(coffee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching coffee", error });
    }
};

// Get all coffee
export const getAllCoffees = async (req: Request, res: Response) => {
    try {
        const coffees = await Coffee.find({});
        res.json(coffees);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error fetching coffees", error });
    }
};

// Update coffee
export const updateCoffee = async (req: Request, res: Response) => {
    try {
        const { Ingredients, Description, Allergens, ImageURL } = req.body;
        let updateData: { Ingredients?: [string]; Description?: string; Allergens?: [string]; ImageURL?: string } = {};

        if (Ingredients !== undefined) {
            updateData.Ingredients = Ingredients;
        }
        if (Description !== undefined) {
            updateData.Description = Description;
        }
        if (Allergens !== undefined) {
            updateData.Allergens = Allergens;
        }
        if(ImageURL !== undefined){
            updateData.ImageURL = ImageURL;
        }

        const updatedCoffee = await Coffee.findOneAndUpdate(
            { Name: req.params.name },
              updateData,
            { new: true }
        );

        if (!updatedCoffee) {
            return res.status(404).json({ message: "Coffee not found" });
        }
        res.status(200).json({ message: "Coffee updated successfully", updatedCoffee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating coffee", error });
    }
};

// Delete a coffee
export const deleteCoffee = async (req: Request, res: Response) => {
    try {
        const deletedCoffee = await Coffee.findOneAndDelete({ Name: req.params.name });
        if (!deletedCoffee) {
            return res.status(404).json({ message: "Coffee not found" });
        }
        res.json({ message: "Coffee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting coffee", error });
    }
};