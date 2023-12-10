import bcrypt from 'bcrypt';
import User from "../models/userModel";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Register user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { Username, Email, Password, Role, Nickname } = req.body;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(Email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const user = await User.create({
            Username,
            Email,
            Password: hashedPassword,
            Role,
            Nickname
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error creating user", error });
    }
};


// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Username, Password } = req.body;
        const user = await User.findOne({ Username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT secret is not defined.');
            return res.status(500).json({ message: "Internal server error" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.Role, username: user.Username },
            jwtSecret,
            { expiresIn: '2d' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Get a single user by username
export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ Username: req.params.username })
                               .select('-Password'); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user", error });
    }
};


// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error fetching users", error });
    }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { Nickname, Email, Role, Password } = req.body;
        let updateData: { Nickname?: string; Email?: string, Role?: string; Password?: string } = {};

        if (Nickname !== undefined) {
            updateData.Nickname = Nickname;
        }
        if(Email !== undefined) {
            updateData.Email = Email;
        }
        if (Role !== undefined) {
            updateData.Role = Role;
        }
        if (Password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            updateData.Password = await bcrypt.hash(Password, salt);
        }

        const updatedUser = await User.findOneAndUpdate(
            { Username: req.params.username },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findOneAndDelete({ Username: req.params.username });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user", error });
    }
};
