import mongoose from "mongoose";

enum ServiceType {
    ToGo = "ToGo",
    DineIn = "DineIn",
    Both = "Both"
}

const coffeeShopSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    Geolocation: {
        type: [Number],
        required: true
    },
    ManagerId: {
        type: String,
        default: null,
        required: false
    },
    Coffees:{
        type: [String],
        required: true,
        index: true
    },
    Address: {
        type : String,
        required: true
    },
    Availabilities: {
        type: [String],
        default: null,
        required: false
    },
    ServiceType: {
        type: String,
        enum: ServiceType,
        required: true
    },
    Description: {
        type: String,
        default: null,
        required: false
    },
    Photos: {
        type: [String],
        default: null,
        required: false
    }
});

export default mongoose.model("CoffeeShop", coffeeShopSchema); 
