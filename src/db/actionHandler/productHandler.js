import { DB_CONSTANTS } from "../../utils/dbConstants.js";
import { internalServer } from "../../utils/response.js";
import { Product } from "../models/product.model.js";

const productHandler = async (event) => {
  console.log("Enter in Product action handler", event);
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
    const result = await Product.find(data);
    console.log("Data fetched successfully:", result);
    if(result.length === 0) {
      return { status: "404", data: "No data found" };
    }
    return { status: "200", data: result ? result : [] };
  } catch (err) {
    console.log("Error in getData of Product action handler", err);
    throw internalServer("Error fetching data from Product collection", err);
  }
};

const saveData = async (data) => {
  try {
    const result = await Product.create(data);
    return { status: "201", data: result };
  } catch (err) {
    console.log("Error in saveData of Product action handler", err);
    throw internalServer("Error saving data to Product collection", err);
  }
}

export { productHandler };
