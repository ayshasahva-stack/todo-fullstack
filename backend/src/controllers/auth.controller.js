import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendSuccessResponse from "../utils/ApiResponse.js";


const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION || "1d" });


}

export const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ApiError(400, "All fields are required"));

        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError(400, "User already exists"));
        }

        const user = await User.create({ name, email, password });
        const token = createToken(user);
        sendSuccessResponse(res, 201, { user, token }, "User registered successfully");


    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(400, "Email and password are required"));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.isPasswordCorrect(password))) {
            return next(new ApiError(401, "Invalid email or password"));
        }
        const token = createToken(user);
        sendSuccessResponse(res, 200, { id: user._id, name: user.name, email: user.email, token }, "User logged in successfully");

    } catch (error) {
        next(error);
    }
}
