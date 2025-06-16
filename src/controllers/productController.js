import { dbHandler } from "../db/index.js";
import { DB_CONSTANTS } from "../utils/constants.js";
import { error, info } from "../utils/logger.js";
import {
  errorResponse,
  internalServerResponse,
  successResponse,
} from "../utils/response.js";
import { globalProductValidation } from "../utils/validation.js";

const getAllProcducts = async ( event, res) => {
  try {
    info({ message: "Enter in getAllProducts", data: event.body });

    event = event.body || event;

    const DBFunctionInvocationParams = {
      collectionName: DB_CONSTANTS.COLLECTIONS.PRODUCT,
      actionType: DB_CONSTANTS.ACTION_TYPES.GET_DATA,
      query: event.query || {},
    };
    const products = await dbHandler(DBFunctionInvocationParams);

    return successResponse(res, "Products fetched successfully", products.data);
  } catch (err) {
    error({ message: "Error in getAllProducts", error: err });
    throw errorResponse(res, "Error fetching products", err);
  }
};

const getProductById = async (event, res) => {
  try {
    info({ message: "Enter in getProductById", event: event.params });

    const productId = event.params?.id;
    if (!productId) {
      return errorResponse(res, "Product ID is required");
    }

    const DBFunctionInvocationParams = {
      collectionName: DB_CONSTANTS.COLLECTIONS.PRODUCT,
      actionType: DB_CONSTANTS.ACTION_TYPES.GET_DATA,
      query: { _id: productId },
    };
    const product = await dbHandler(DBFunctionInvocationParams);

    if (!product.data || product.data.length === 0) {
      return errorResponse(res, "Product not found", { status: 404 });
    }

    return successResponse(res, "Product fetched successfully", product.data[0]);
  } catch (error) {
    console.error("Error in getProductById:", error);
    internalServerResponse(res, "Error fetching product by ID", error);
  }
};

const createProduct = async ( event, res) => {
  try {
    info({ message: "Enter in createProduct", data: event.body });
    
    const imageUrls = event.files.map(file => file.path);

    event = event.body || event;
    globalProductValidation(event);


    const DBFunctionInvocationParams = {
      collectionName: DB_CONSTANTS.COLLECTIONS.PRODUCT,
      actionType: DB_CONSTANTS.ACTION_TYPES.SAVE_DATA,
      query: { ...event, images: imageUrls },
    };
    const newProduct = await dbHandler(DBFunctionInvocationParams);

    return successResponse(res, "New product created successfully", newProduct.data);
  } catch (error) {
    console.error("Error in createNewProducts:", error);
    internalServerResponse(res, "Error creating new product", error);
  }
};

const updateProduct = async (event, res) => {
  try {
    info({ message: "Enter in updateProduct", data: event.body });

    const productId = event.params?.id;
    if (!productId) {
      return errorResponse(res, "Product ID is required");
    }

    const imageUrls = event.files ? event.files.map(file => file.path) : [];
    event = event.body || event;
    globalProductValidation(event);

    const DBFunctionInvocationParams = {
      collectionName: DB_CONSTANTS.COLLECTIONS.PRODUCT,
      actionType: DB_CONSTANTS.ACTION_TYPES.UPDATE_DATA,
      query: { ...event, _id: productId, images: imageUrls },
    };
    const updatedProduct = await dbHandler(DBFunctionInvocationParams);

    return successResponse(res, "Product updated successfully", updatedProduct.data);
  } catch (error) {
    console.error("Error in updateProduct:", error);
    internalServerResponse(res, "Error updating product", error);
  }
};

const deleteProduct = async (event, res) => {
  try {
    info({ message: "Enter in deleteProduct", data: event.params });

    const productId = event.params?.id;
    if (!productId) {
      return errorResponse(res, "Product ID is required");
    }

    const DBFunctionInvocationParams = {
      collectionName: DB_CONSTANTS.COLLECTIONS.PRODUCT,
      actionType: DB_CONSTANTS.ACTION_TYPES.DELETE_DATA,
      query: { _id: productId },
    };
    const deletedProduct = await dbHandler(DBFunctionInvocationParams);

    if (!deletedProduct.data || deletedProduct.data.length === 0) {
      return errorResponse(res, "Product not found", { status: 404 });
    }

    return successResponse(res, "Product deleted successfully", deletedProduct.data);
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    internalServerResponse(res, "Error deleting product", error);
  }
};

export {
  getAllProcducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
