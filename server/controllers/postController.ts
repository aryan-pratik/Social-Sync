import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import { Generation } from "../models/Generation.js";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";


// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res:Response ) : Promise<void> => {
    try {
        const {prompt, tone } = req.body

        const apiKey = process.env.GEMINI_API_KEY;

        if(!apiKey) {
            res.status(500).json({message:"Your gemini api key is missing. Add it in your .env"})
            return
        }

        const ai = new GoogleGenAI({apiKey})

        // Generating text with fallback across models
        const models = ["gemini-3.6-flash-lite", "gemini-3.6-flash"];
        let result: any = null;
        let lastError: any = null;

        for (const modelName of models) {
            try {
                result = await ai.models.generateContent({
                    model: modelName,
                    contents: `Generate a social media post based on this prompt: ${prompt} and tone: ${tone} Include the relevant hashtags`
                });
                if (result) break;
            } catch (err: any) {
                lastError = err;
                console.warn(`Model ${modelName} rate limited/unavailable, trying next model...`);
            }
        }

        if (!result) {
            throw lastError || new Error("All Gemini models failed. Please check rate limit/quota or try again later.");
        }

        let content = ""

        try {
            const rawText = result.text || ""
            const jsonMatch = rawText.match(/\{[\s\S]*\}/)
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {content: rawText};

            content = data.content;
        } catch (error) {
            console.error('Error parsing generated content:', error);
            content = result.text || "";
        }


        const generation = await Generation.create({
            user: req.user._id,
            prompt,
            content,
            tone
        })

        res.json(generation)
        
    } catch (error:any) {
        console.error('Error in generatePost:', error);
        res.status(500).json({message: error?.message || "Server error"});
    }
}

// Get generated posts
// GET /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const generation = await Generation.find({
            user: req.user._id
        }).sort({createdAt: -1})

        res.json(generation)
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const posts = await Post.find({user: req.user._id})
        res.json(posts)
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const { content, mediaUrl, mediaType, platforms, scheduledFor, status } = req.body


        let parsedPlatforms = platforms;
        if(typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms)
            } catch (error) {
                parsedPlatforms = platforms.split(",")
            }
        }

        if (!Array.isArray(parsedPlatforms) || parsedPlatforms.length === 0) {
            res.status(400).json({ message: "Please select at least one channel." });
            return;
        }

        const connectedAccounts = await Account.find({
            user: req.user._id,
            platform: { $in: parsedPlatforms },
            status: "connected"
        });

        const connectedPlatforms = connectedAccounts.map((a: any) => a.platform);
        const unconnectedPlatforms = parsedPlatforms.filter((p: string) => !connectedPlatforms.includes(p));

        if (unconnectedPlatforms.length > 0) {
            const formatted = unconnectedPlatforms.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ");
            res.status(400).json({
                message: `Please connect your ${formatted} account(s) before scheduling.`
            });
            return;
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            mediaUrl,
            mediaType,
            platforms: parsedPlatforms,
            scheduledFor, 
            status: status || "scheduled",
        }) 
        res.status(201).json(post)
        
    } catch (error: any) {
        console.error("Error in schedulePost:", error);
        res.status(500).json({message: error?.message || "Server error"})
    }
}


