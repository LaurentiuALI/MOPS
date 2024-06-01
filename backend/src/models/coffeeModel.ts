import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    Ingredients: {
        type: [String],
        required: true
    },
    Description: {
        type: String,
        default: null,
        required: false
    },
    Allergens: {
        type: [String], 
        required: false
    },
    Image: {
        type: String,
        required: false
    }
});

export default mongoose.model("Coffee", coffeeSchema); 
