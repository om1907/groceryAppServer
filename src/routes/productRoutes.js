import express from "express";
import {
  getAllProcducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("products/").get(getAllProcducts);
router.route("products/:id").get(getProductById);
router.route("products/").get(createProduct);
router.route("products/:id").get(updateProduct);
router.route("products/:id").get(deleteProduct);

export default router;
