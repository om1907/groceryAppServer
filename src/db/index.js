import { DB_CONSTANTS } from "../utils/dbConstants.js";
import { internalServer } from "../utils/response.js";
import { orderHandler } from "./actionHandler/orderHandler.js";
import { productHandler } from "./actionHandler/productHandler.js";
import { userHandler } from "./actionHandler/userHandler.js";
import { makeDbConnection } from "./mongoose.js";

let mongoDbConnectionPool = null;

const dbHandler = async (event) => {
  try {
    console.log("Enter in dbHandler", event);

    // Check if the connection pool exists
    if (!mongoDbConnectionPool) {
      mongoDbConnectionPool = await makeDbConnection();
    } else {
      console.log("Using existing database connection pool");
    }

    let result = await processEvent(event);

    console.log("Event processed successfully:", result);
    return result;
  } catch (err) {
    console.error("Error in dbHandler", err);
    throw internalServer("Error processing event in dbHandler", err);
  }
};

const processEvent = async (event) => {
  console.log("Enter in processEvent of DbHandler", event);
  switch (event.collectionName) {
    case DB_CONSTANTS.COLLECTIONS.USER:
      return userHandler(event);
    case DB_CONSTANTS.COLLECTIONS.PRODUCT:
      return productHandler(event);
    case DB_CONSTANTS.COLLECTIONS.ORDER:
      return orderHandler(event);
    default:
      console.log("CollectioinName not found");
  }
};

export { dbHandler };
