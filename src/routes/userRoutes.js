import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to user API" });
});

export default userRoutes;
