import { Router } from "express";
import { addReview, getReviewById, getAllReviews, getCoffeeShopRating, updateReview, deleteReview } from "../controllers/reviewController";

export const reviewRouter = Router();

reviewRouter.post("/reviews/add", addReview);
reviewRouter.get('/reviews/:reviewId', getReviewById);
reviewRouter.get("/reviews", getAllReviews);
reviewRouter.get("/reviews/rating/:coffeeShopName", getCoffeeShopRating);
reviewRouter.put("/reviews/:reviewId", updateReview);
reviewRouter.delete("/reviews/:reviewId", deleteReview);