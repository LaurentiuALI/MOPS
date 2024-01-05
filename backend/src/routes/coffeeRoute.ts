import { Router } from "express";
import {addCoffee, getCoffeeByName, getAllCoffees, updateCoffee, deleteCoffee } from "../controllers/coffeeController";

export const coffeeRouter = Router();

coffeeRouter.post("/coffees/add", addCoffee);
coffeeRouter.get("/coffees/:name", getCoffeeByName);
coffeeRouter.get("/coffees", getAllCoffees);
coffeeRouter.put("/coffees/:name", updateCoffee);
coffeeRouter.delete("/coffees/:name", deleteCoffee);