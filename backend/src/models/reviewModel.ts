import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    CoffeeShopName: {
        type: String,
        required: true
    },
    CoffeeName: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Rating: {
        type: Number, 
        required: true
    },
    Notes: {
        type: String,
        default: null,
        required: false
    },
    TimeStamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Review", reviewSchema); 
