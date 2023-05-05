import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
const router = Router()
 
router.post("/products",productController.createProduct)

export default router; 