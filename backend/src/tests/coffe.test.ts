import express from "express";
import request from "supertest";
import { get } from "mongoose";


jest.mock('../models/coffeeModel', () => ( {
    create: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    findOneAndDelete: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
}));

const app = express();
app.use(express.json());
app.use('/api');

describe('addCoffee', () => {
    it('should create a new coffee and return a success message', async () => {
        const newCoffee = {
            Name: 'Test Coffee',
            Ingredients: ['Coffee', 'Milk'],
            Description: 'A test coffee',
            Allergens: ['Milk']
        };

        const response = await request(app)
            .post('/api/coffees/add')
            .send(newCoffee);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "Coffee created successfully"});
        expect(Coffee.create).toHaveBeenCalledWith(newCoffee);
    });
    it('should return an error if the coffee name is missing', async () => {
        const newCoffee = {
            Ingredients: ['Coffee', 'Milk'],
            Description: 'A test coffee',
            Allergens: ['Milk']
        };

        const response = await request(app)
            .post('/api/coffees/add')
            .send(newCoffee);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({"message": "Please provide all fields"});
    });
});

describe('getCoffeeByName', () => {
    it('should return a coffee if it exists', async () => {
        const mockCoffee = {
            Name: 'TestCoffee'
        };

        Coffee.findOne(mockCoffee);

        const response = await request(app)
            .get('/api/coffees/TestCoffee'); 

        expect(response.status).toBe(200);
    });
    it('should return an error if the coffee does not exist', async () => {
        const mockCoffee = {
            Name: 'NonexistentCoffee'
        };

        (Coffee.findOne as jest.Mock).mockResolvedValue(null);
    
        const response = await request(app)
            .get(`/api/coffees/${mockCoffee.Name}`); 
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({"message": "Coffee not found"});
    });
});

describe("getAllCoffees", () => {
    it("should return all coffees", async () => {
        Coffee.find({});

        const response = await request(app)
            .get('/api/coffees');

        expect(response.status).toBe(200);
    });
});

describe("updateCoffee", () => {
    it("should update a coffee and return a success message", async () => {
        const mockCoffee = {
            Name: 'TestCoffee',
        };

        const updateCoffee = {
            Ingredients: ['Coffee', 'Milk'],
            Description: 'A test coffee',
            Allergens: ['Milk']
        };

        const updatedCoffee = {};

        Coffee.findOneAndUpdate(mockCoffee, updateCoffee, { new: true });

        const response = await request(app)
            .put('/api/coffees/TestCoffee')
            .send(updateCoffee);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Coffee updated successfully", updatedCoffee});
    });
    it("should return an error if the coffee name is missing", async () => {
        const updateCoffee = {
            Ingredients: ['Coffee', 'Milk'],
            Description: 'A test coffee',
            Allergens: ['Milk']
        };

        const response = await request(app)
            .put('/api/coffees/')
            .send(updateCoffee);

        expect(response.status).toBe(404);
    });
});

describe("deleteCoffee", () => {
    it("should delete a coffee and return a success message", async () => {
        const mockCoffee = {
            Name: 'TestCoffee'
        };

        Coffee.findOneAndDelete(mockCoffee);

        const response = await request(app)
            .delete('/api/coffees/TestCoffee');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Coffee deleted successfully"});
    });
    it("should return an error if the coffee name is missing", async () => {
        const response = await request(app)
            .delete('/api/coffees/');

        expect(response.status).toBe(404);
    });
});

