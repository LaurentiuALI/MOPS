import mongoose from "mongoose";

// Define a schema for the menu items
const menuItemSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    default: 0,
  },
});

// Define an enum for service types
const ServiceType = {
  ToGo: "ToGo",
  DineIn: "DineIn",
  Both: "Both",
};

// Define the main coffee shop schema
const coffeeShopSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Geolocation: {
    type: [Number],
    required: true,
  },
  ManagerId: {
    type: Number,
    default: 1,
    required: false,
  },
  Address: {
    type: String,
    required: true,
  },
  Availabilities: {
    type: [{
        workDay: String,
        openingHour: String,
        closingHour:String,
    }],
    default: null,
    require: false
},
  ServiceType: {
    type: String,
    enum: Object.values(ServiceType),
    required: true,
  },
  Description: {
    type: String,
    default: null,
    required: false,
  },
  Photos: {
    type: [String],
    default: null,
    required: false,
  },
  // Nested schema for menu items
  Menu: [menuItemSchema],
});

export default mongoose.model("CoffeeShop", coffeeShopSchema);
