import { internalServerResponse } from "../utils/response.js";

const getAllProcducts = async (event, res ) => {
    try {
        
    } catch (err) {
        console.error("Error in getAllProducts:", err);
        internalServerResponse(res, "Error fetching products", err);
    }
};

const getProductById = async (event, res) => {
    try {
        
    } catch (error) {
        console.error("Error in getProductById:", error);
        internalServerResponse(res, "Error fetching product by ID", error);
    }
}

const createProduct = async (event, res) => {
    try {
        
    } catch (error) {
        console.error("Error in createNewProducts:", error);
        internalServerResponse(res, "Error creating new product", error);
    }
};

const updateProduct = async (event, res) => {
    try {
        
    } catch (error) {
        console.error("Error in updateProduct:", error);
        internalServerResponse(res, "Error updating product", error);
    }
};

const deleteProduct = async (event, res) => {   
    try {
        
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
}