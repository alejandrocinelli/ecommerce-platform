import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.post("/addCart/:id",cartController.addToCart);
router.get("/cart",cartController.findCartById);
router.post("/decrementQty/:id",cartController.decrementQty);
router.post("/increaseQty/:id",cartController.increaseQty);
router.post("/emptyCart",cartController.emptyCart);
router.post("/finish",cartController.finishCart);

export default router;