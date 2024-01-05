import { Router } from "express";
import { addCoffeeShop, getCoffeeShopByName, getAllCoffeeShops, getCoffeeShopByCoffeeName, updateCoffeeShop, deleteCoffeeShop } from "../controllers/coffeeShopController";

export const coffeeShopRouter = Router();

coffeeShopRouter.post("/coffeeShops/add", addCoffeeShop);
coffeeShopRouter.get("/coffeeShops/:name", getCoffeeShopByName);
coffeeShopRouter.get("/coffeeShops", getAllCoffeeShops);
coffeeShopRouter.get("/coffeeShops/byCoffee/:coffeeName", getCoffeeShopByCoffeeName);
coffeeShopRouter.put("/coffeeShops/:name", updateCoffeeShop);
coffeeShopRouter.delete("/coffeeShops/:name", deleteCoffeeShop);
