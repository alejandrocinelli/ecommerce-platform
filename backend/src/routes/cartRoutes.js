import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.post("/addCart/:id",cartController.addToCart);

export default router;