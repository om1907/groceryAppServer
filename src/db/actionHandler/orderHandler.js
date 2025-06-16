import { DB_CONSTANTS } from "../../utils/constants.js";
import { internalServer } from "../../utils/response.js";
import User from "../models/user.model.js";

const orderHandler = async (event) => {
  console.log("Enter in User action handler", event);
  switch (event.actionType) {
    case DB_CONSTANTS.ACTION_TYPES.GET_DATA:
      getData(event.query);
      break;
    case DB_CONSTANTS.ACTION_TYPES.SAVE_DATA:
      saveData(event.query);
      break;
    default:
      console.log("ActionType not found");
  }
};

const getData = async (data) => {
  try {
    const result = await User.find(data);
    console.log("Data fetched successfully:", result);
    return { status: "200", data: result ? result : [] };
  } catch (err) {
    console.log("Error in getData of User action handler", err);
    throw internalServer("Error fetching data from User collection", err);
  }
};

export { orderHandler };
