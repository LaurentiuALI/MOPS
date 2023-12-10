import mongoose, { model, Schema } from "mongoose";

enum UserRole {
    User = "User",
    Admin = "Admin",
    Manager = "Manager"
}

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    Email: {
        type: String,
        default: null,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Nickname: {
        type: String,
        default: null,
        required: false
    },
    Role: {
        type: String,
        enum: UserRole,
        required: true
    }
});

export default mongoose.model("User", userSchema);

