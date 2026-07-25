import { Router } from "express";
import { loginUser, registerUser, logoutUser, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", protect, getMe);

export default authRouter;