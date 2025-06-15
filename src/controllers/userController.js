import { comparePassword, hashPassword } from "../utils/hashing/index.js";
import { checkIfUserExists, createNewUser } from "../utils/helper.js";
import { internalServerResponse, successResponse } from "../utils/response.js";
import { generateToken } from "../utils/token.js";

export const userLoginController = async(event, res ) => {
    try {
        const { email , password } = event.body;
        if(!email || !password) {
            return internalServerResponse(res, "Please enter valid email and password");
        }

        const user = await checkIfUserExists(email);
        if (user.status !== '200') {
            return internalServerResponse(res, "User not found");
        }

        const isPasswordValid = await comparePassword(password, user?.data?.[0]?.password);
        if (!isPasswordValid) {
            return internalServerResponse(res, "Please enter valid email and password");
        }

        const token = generateToken(user?.data?.[0]?._id);

        return successResponse(res, "Login successful",{userData: user?.data?.[0], token});
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
        
        const existingUser = await checkIfUserExists(email);
        if (existingUser.status === '200') {
            return successResponse(res, "User already exists");
        }

        const hashedPassword = await hashPassword(password);
        event.body.password = hashedPassword;

        const newUser = await createNewUser(event.body);

        return successResponse(res, "User registered successfully", newUser);
    } catch (err) {
        console.error("Error in user registration", err);
        return internalServerResponse(res, "Internal server error", err);
    }
};
