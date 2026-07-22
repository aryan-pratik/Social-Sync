import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";


// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res:Response ) : Promise<void> => {

}

// Get generated posts
// GET /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response) : Promise<void> => {
    
}

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response) : Promise<void> => {

}

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response) : Promise<void> => {

}


