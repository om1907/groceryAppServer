import express from "express";
import {
  getAllProcducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/products").get(getAllProcducts);
router.route("/products/:id").get(getProductById);
router.route("/products/create-product").post(upload.array('images', 5),createProduct);
router.route("/products/:id").get(updateProduct);
router.route("/products/:id").get(deleteProduct);

export default router;
