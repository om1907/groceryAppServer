import { comparePassword, hashPassword } from "../utils/hashing/index.js";
import { checkIfUserExists, createNewUser } from "../utils/helper.js";
import { info, error } from "../utils/logger.js";
import { errorResponse, internalServerResponse, successResponse } from "../utils/response.js";
import { globalUserObjectValidation, globalUserObjectValidationForLogin } from "../utils/validation.js";
import { generateToken } from "../utils/token.js";

export const userLoginController = async(event, res ) => {
    try {
        info({ message: "Enter in userLoginController", data: event.body });

        event = event.body || event;
        globalUserObjectValidationForLogin(event);

        const user = await checkIfUserExists(event.email);
        if (user.status !== '200') {
            return internalServerResponse(res, "User not found");
        }

        const isPasswordValid = await comparePassword(event.password, user?.data?.[0]?.password);
        if (!isPasswordValid) {
            return internalServerResponse(res, "Please enter valid email and password");
        }

        const token = generateToken(user?.data?.[0]?._id);

        return successResponse(res, "Login successful",{userData: user?.data?.[0], token});
    } catch (err) {
        error({ message: "Error in userLoginController", data: err });
        throw errorResponse(res, err);
    }
};

export const userRegisterController = async(event, res) => {
    try {
        info({ message: "Enter in userRegisterController", data: event.body });

        event = event.body || event;
        globalUserObjectValidation(event);
        
        const existingUser = await checkIfUserExists(event.email);
        if (existingUser.status === '200') {
            return successResponse(res, "User already exists");
        }

        const hashedPassword = await hashPassword(event.password);
        event.password = hashedPassword;

        const newUser = await createNewUser(event);

        return successResponse(res, "User registered successfully", newUser);
    } catch (err) {
        error({ message: "Error in userRegisterController", data: err });
        throw errorResponse(res, err);
    }
};
