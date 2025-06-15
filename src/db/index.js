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
    case "Users":
      return userHandler(event);
    case "Products":
      return productHandler(event);
    case "Orders":
      return orderHandler(event);
    default:
      console.log("CollectioinName not found");
  }
};

export { dbHandler };
