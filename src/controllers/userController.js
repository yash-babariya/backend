import User from "../models/user.model.js";
import joi from "joi";

const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
});

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


