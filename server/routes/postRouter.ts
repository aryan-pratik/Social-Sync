import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { generatePost, getGenerations, getPosts, schedulePost, uploadMedia, updateGeneration } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/", protect, getPosts)
postRouter.post("/", protect, schedulePost)
postRouter.post("/upload", protect, uploadMedia)
postRouter.post("/generate", protect, generatePost)
postRouter.get("/generations", protect, getGenerations)
postRouter.put("/generations/:id", protect, updateGeneration)

export default postRouter
