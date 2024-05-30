import express from 'express';
import { getCoffeeShopByManagerId } from '../controllers/managerController';

const router = express.Router();

// Define route to get coffee shop by manager ID
router.get('/coffeeshop/manager/:managerId', getCoffeeShopByManagerId);

export default router;
