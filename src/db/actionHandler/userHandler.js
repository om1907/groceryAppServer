import { DB_CONSTANTS } from "../../utils/dbConstants.js";
import { internalServer } from "../../utils/response.js";
import User from "../models/user.model.js";

const userHandler = async (event) => {
  console.log("Enter in User action handler", event);
  switch (event.actionType) {
    case DB_CONSTANTS.ACTION_TYPES.GET_DATA:
      return getData(event.query);
    case DB_CONSTANTS.ACTION_TYPES.SAVE_DATA:
      return saveData(event.query);
    default:
      console.log("ActionType not found");
  }
};

const getData = async (data) => {
  try {
    const result = await User.find(data);

    if(result.length === 0) {
      return { status: "404", data: "No data found" };
    }
    return { status: "200", data: result ? result : [] };
  } catch (err) {
    console.log("Error in getData of User action handler", err);
    throw internalServer("Error fetching data from User collection", err);
  }
};

const saveData = async (data) => {
  try {
    const result = await User.create(data);
    return { status: "201", data: result };
  } catch (err) {
    console.log("Error in saveData of User action handler", err);
    throw internalServer("Error saving data to User collection", err);
  }
}

export { userHandler };
