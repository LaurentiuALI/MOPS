import { Router } from "express";
import {addCoffee, getCoffeeByName, getAllCoffees, updateCoffee, deleteCoffee } from "../controllers/coffeeController";
import upload from "../multer";

export const coffeeRouter = Router();

coffeeRouter.post("/coffees/add", upload.single("Image"), addCoffee)
coffeeRouter.get("/coffees/:name", getCoffeeByName);
coffeeRouter.get("/coffees", getAllCoffees);
coffeeRouter.put("/coffees/:name", updateCoffee);
coffeeRouter.delete("/coffees/:name", deleteCoffee);