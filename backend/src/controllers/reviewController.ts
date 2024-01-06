import Review from "../models/reviewModel";
import { Request, Response } from 'express';


// Create review
export const addReview = async (req: Request, res: Response) => {
    try {
        const { CoffeeShopName, CoffeeName, Username, Rating, Notes} = req.body;

        const review = await Review.create({
            CoffeeShopName,
            CoffeeName,
            Username,
            Rating,
            Notes
        });

        res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error creating review", error });
    }
};

// Get a single review by reviewId
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching review", error });
    }
};


// Get all reviews
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({});
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error fetching reviews", error });
    }
};

// Get CoffeeShop rating based on coffee's rating
export const getCoffeeShopRating = async (req: Request, res: Response) => {
    try {
        const coffeeShopName = req.params.coffeeShopName;
        const result = await Review.aggregate([
            { $match: { CoffeeShopName: coffeeShopName } },
            { $group: { _id: null, AverageRating: { $avg: "$Rating" } } }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No reviews found for this coffee shop" });
        }

        const averageRating = result[0].AverageRating;
        res.json({ AverageRating: averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching coffee shop rating", error });
    }
}

// Update review
export const updateReview = async (req: Request, res: Response) => {
    try {
        const { Rating, Notes } = req.body;
        let updateData: { Rating?: number; Notes?: string; } = {};

        if (Rating !== undefined) {
            updateData.Rating = Rating;
        }
        if (Notes !== undefined) {
            updateData.Notes = Notes;
        }

        const updatedReview = await Review.findOneAndUpdate(
            { _id : req.params.reviewId },
              updateData,
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review updated successfully", updatedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating review", error });
    }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const deletedReview = await Review.findOneAndDelete({ _id : req.params.reviewId });
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting review", error });
    }
};

