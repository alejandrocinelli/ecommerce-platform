import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";

const router = Router();

router.get("/category/men", categoryController.getCategoryMen);
router.get("/category/woman", categoryController.getCategoryWomen);
router.get("/category/kids", categoryController.getCategoryKids);

export default router; 