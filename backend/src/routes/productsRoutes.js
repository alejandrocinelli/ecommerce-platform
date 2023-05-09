import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
const router = Router()
 
router.post("/products",productController.createProduct)
router.post("/deleteProduct/:id",productController.deleteProduct)
router.get("/updateProduct/:id",productController.getProductsId)
router.post("/updateProduct/:id",productController.updateProduct) 
// router.get("/products",productController.getProductsXCategory)
// router.get("/products/:id",productController.getProductsId)


export default router; 