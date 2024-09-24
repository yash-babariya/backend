import "dotenv/config";
export const PORT = process.env.PORT || 5353;
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://yashbabariya:Yash%405353@yash.fevlh.mongodb.net/fullstackDatabase";
export const JWT_SECRET = process.env.JWT_SECRET || "yash5353";


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;



