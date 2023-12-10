import express from "express";
import request from "supertest";
import { coffeeShopRouter } from "../routes/coffeeShopRoute";
import CoffeeShop from "../models/coffeeShopModel"; 

// Mock the CoffeeShop model with a specific implementation
jest.mock('../models/coffeeShopModel', () => ({
    create: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
}));

const app = express();
app.use(express.json());
app.use('/api', coffeeShopRouter);

describe('addCoffeeShop', () => {
    it('should create a new coffee shop and return a success message', async () => {
        const newCoffeeShop = {
            Name: 'Test Coffee Shop',
            Geolocation: [123, 456], 
            ManagerId: 'manager123',
            Coffees: ['Espresso', 'Latte'],
            Address: '123 Test St',
            Availabilities: ['Morning', 'Afternoon'],
            ServiceType: 'DineIn', 
            Description: 'A cozy place for coffee',
            Photos: ['photo1.jpg', 'photo2.jpg']
        };

        const response = await request(app)
            .post('/api/coffeeShops/add')
            .send(newCoffeeShop);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "CoffeeShop created successfully"});
        expect(CoffeeShop.create).toHaveBeenCalledWith(newCoffeeShop);
    });
});


describe('getCoffeeShopByName', () => {
    it('should return a coffee shop if it exists', async () => {
        const mockCoffeeShop = {
            Name: 'TestCoffeeShop'
        };

        CoffeeShop.findOne(mockCoffeeShop);

        const response = await request(app)
            .get('/api/coffeeShops/TestCoffeeShop'); 

        expect(response.status).toBe(200);
    });
});