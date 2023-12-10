import { Router } from "express";
import { addCoffeeShop, getCoffeeShopByName } from "../controllers/coffeeShopController";

export const coffeeShopRouter = Router();

coffeeShopRouter.post("/coffeeShops/add", addCoffeeShop);
coffeeShopRouter.get("/coffeeShops/:name", getCoffeeShopByName);