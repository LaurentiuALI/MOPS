import { Router } from "express";
import {
  addCoffeeShop,
  getCoffeeShopByName,
  getAllCoffeeShops,
  getCoffeeShopByCoffeeName,
  updateCoffeeShop,
  deleteCoffeeShop,
  deleteMenuItem,
} from "../controllers/coffeeShopController";

export const coffeeShopRouter = Router();

coffeeShopRouter.post("/coffeeShops/add", addCoffeeShop);
coffeeShopRouter.get("/coffeeShops/:name", getCoffeeShopByName);
coffeeShopRouter.get("/coffeeShops", getAllCoffeeShops);
coffeeShopRouter.get(
  "/coffeeShops/byCoffee/:coffeeName",
  getCoffeeShopByCoffeeName
);
coffeeShopRouter.patch("/coffeeShops/:name", updateCoffeeShop);
coffeeShopRouter.delete("/coffeeShops/:name", deleteCoffeeShop);
coffeeShopRouter.patch("/coffeeShops/:name/menuItem", deleteMenuItem);
