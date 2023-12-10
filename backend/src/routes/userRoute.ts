import { Router } from "express";
import { registerUser, deleteUser, getAllUsers, getUserByUsername, updateUser, loginUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post('/users/login', loginUser);
userRouter.get("/users/:username", verifyToken, getUserByUsername);
userRouter.get("/users", verifyToken, getAllUsers);
userRouter.put("/users/:username", verifyToken, updateUser);
userRouter.delete("/users/:username", verifyToken, deleteUser);
