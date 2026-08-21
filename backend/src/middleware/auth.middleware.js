import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";


const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authorization header missing or invalid"));
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ApiError(401, "User not found"));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
}
export default protect;
