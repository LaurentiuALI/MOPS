import express from "express";
import request from "supertest";
import { get } from "mongoose";
import mongoose from "mongoose";

jest.mock('../models/reviewModel', () => ({
    create: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    findOneAndDelete: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    aggregate: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue([])
    }))
}));

const app = express();
app.use(express.json());
app.use('/api');

describe('addReview', () => {
    it('should create a new review and return a success message', async () => {
        const newReview = {
            CoffeeShopName: "TestCoffeeShop",
            CoffeeName: "TestCoffee",
            Username: "TestUser",
            Rating: 4,
            Notes: "A test review"
        };

        const response = await request(app)
            .post('/api/reviews/add')
            .send(newReview);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "Review created successfully"});
        expect(Review.create).toHaveBeenCalledWith(newReview);
    });
});


describe('getCoffeShopRating', () => {
    it('should return a average rating if coffeeShopExists', async () => {
        const mockReview = {
            Name: 'TestReview'
        };

        const mockAverage = [{ _id: mockReview.Name, averageRating: 4.5 }];

        (Review.aggregate as jest.Mock).mockImplementation(() => ({
            exec: jest.fn().mockResolvedValue(mockAverage)
        }));

        const response = await request(app)
            .get('/api/reviews/' + mockReview.Name);

    });
});

describe("getAllReviews", () => {
    it("should return all reviews", async () => {
        getAllReviews !== undefined;
    });
});

describe("updateReview", () => {
    it("should update a review and return a success message", async () => {
        const mockReview = {
            Name: 'TestReview'
        };

        const updatedReview = {
            Rating: 5,
            Notes: "A test review"
        };

        (Review.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedReview);

        const response = await request(app)
            .put('/api/reviews/' + mockReview.Name)
            .send(updatedReview);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Review updated successfully", updatedReview});
    });
});

describe("deleteReview", () => {
    it("should delete a review and return a success message", async () => {
        const mockReview = {
            ID: 'TestReview'
        };

        Review.findOneAndDelete(mockReview);

        const response = await request(app)
            .delete('/api/Reviews/TestID');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Review deleted successfully"});
    });
    it("should return an error if the review name is missing", async () => {
        const response = await request(app)
            .delete('/api/reviews/');

        expect(response.status).toBe(404);
    });
});
