import { checkIfUserExists, createNewUser } from "../utils/helper.js";
import { internalServerResponse, successResponse } from "../utils/response.js";

export const userLoginController = async(event, res ) => {
    try {

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const userRegisterController = async(event, res) => {
    try {
        const { name, email, password, role = 'User' } = event.body;
        if(!email || !password || !name) {
            return res.status(400).json({ message: "Missing required field"});
        }
        
        // Check if user already exists
        const existingUser = await checkIfUserExists(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const newUser = await createNewUser(event.body);

        return successResponse(res, "User registered successfully", newUser);
    } catch (err) {
        console.error("Error in user registration", err);
        return internalServerResponse(res, "Internal server error", err);
    }
};
