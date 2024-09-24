import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to user API" });
});

userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
