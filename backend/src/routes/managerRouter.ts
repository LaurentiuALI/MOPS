import express from 'express';
import { getCoffeeShopByManagerId, updateCoffeeShopAddress, updateCoffeeShopSchedule } from '../controllers/managerController';

const router = express.Router();

// Define route to get coffee shop by manager ID
router.get('/coffeeshop/manager/:managerId', getCoffeeShopByManagerId);
router.put('/coffeeshop/manager/:coffeeName/schedule', updateCoffeeShopSchedule)
router.put('/coffeeshop/manager/:coffeeName/address', updateCoffeeShopAddress)

export default router;
