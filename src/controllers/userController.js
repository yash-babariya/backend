import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import joi from "joi";
import { JWT_SECRET } from "../config/db.config.js";


// SignupController
const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        'string.pattern.base': 'Create a strong password',
        'string.empty': 'Password is required'
    })
});

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// LoginController
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().messages({
        'string.empty': 'Password is required'
    })
});

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//generateToken
const generateToken = (user) => {
    const payload = {
        id: user._id,
        iat: Date.now(),
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

