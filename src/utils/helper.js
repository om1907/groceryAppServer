import { dbHandler } from "../db/index.js";
import { DB_CONSTANTS } from "./dbConstants.js";

export const checkIfUserExists = async (event) => {
  try {
    console.log("Checking if user exists with email:", event);

    const dbQueryToCheckUser = {
      collectionName: DB_CONSTANTS.COLLECTIONS.USER,
      actionType: DB_CONSTANTS.ACTION_TYPES.GET_DATA,
      query: { email: event },
    };
    const user = await dbHandler(dbQueryToCheckUser);
    return user;
  } catch (error) {
    console.log("Error checking if user exists:", error);
    throw new Error("Error checking if user exists");
  }
};

export const createNewUser = async (event) => {
  try {
    console.log("Creating new user with event:", event);

    const { name, email, password, role = "User" } = event;
    // Validate required fields
    if (!email || !password || !name) {
      throw new Error("Missing required field");
    }

    const dbQueryToCreateuser = {
      collectionName: DB_CONSTANTS.COLLECTIONS.USER,
      actionType: DB_CONSTANTS.ACTION_TYPES.SAVE_DATA,
      query: { name, email, password, role },
    };

    const result = await dbHandler(dbQueryToCreateuser);
    return result;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw new Error("Error creating new user");
  }
};
