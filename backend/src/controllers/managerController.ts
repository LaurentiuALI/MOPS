import { Request, Response } from 'express';
import CoffeeShop from '../models/coffeeShopModel'; // Adjust the path to where your model is defined

// Controller function to get coffee shop by manager ID
export const getCoffeeShopByManagerId = async (req: Request, res: Response): Promise<void> => {

    try {
        const coffeeShop = await CoffeeShop.findOne({ "ManagerId": req.params.managerId.toString() });

        console.log(req.params.managerId)
        console.log(coffeeShop)
        if (!coffeeShop) {
            res.status(404).json({ message: 'Coffee shop not found' });
            return;
        }

        res.status(200).json(coffeeShop);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
