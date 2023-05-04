import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router(); 

router.get("/register", userController.getRegister);// este tendria que servir el register
router.post("/register",passport.authenticate("register",{ failureFlash: true,failureRedirect: "/auth/signup-error" }),userController.getLogin  )


router.get("/login", userController.getLogin);// este tendria que servir el login
router.post("/login",passport.authenticate("login",{ failureRedirect: "/auth/login-error" }), userController.getLogin  )

router.get("/logout", userController.logout);

router.get("/login-error",userController.loginFailed);
router.get("/signup-error",userController.registerFailed);

router.get("/admin", userController.getAdmin);
export default router;