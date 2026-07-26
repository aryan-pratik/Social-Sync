import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import { Generation } from "../models/Generation.js";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import cloudinary from "../config/cloudinary.js";


// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone } = req.body

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            res.status(500).json({ message: "Your gemini api key is missing. Add it in your .env" })
            return
        }

        const ai = new GoogleGenAI({ apiKey })

        // Generating text with fallback across models
        const models = ["gemini-3.6-flash-lite", "gemini-3.6-flash"];
        let result: any = null;
        let lastError: any = null;

        for (const modelName of models) {
            try {
                result = await ai.models.generateContent({
                    model: modelName,
                    contents: `You are an expert social media copywriter and growth marketer.

                    Your goal is to generate exactly one highly engaging social media post that maximizes attention, readability, and audience interaction.

                    Input:
                    - Prompt: "${prompt}"
                    - Tone: "${tone}"

                    Instructions:
                    - Generate exactly one social media post.
                    - Match the requested tone consistently throughout the post.
                    - Start with a strong hook that captures attention within the first sentence.
                    - Make the post engaging, relatable, and easy to read.
                    - Encourage interaction naturally (comments, shares, likes, or discussion) without sounding spammy.
                    - Include a clear takeaway, insight, or value for the reader.
                    - Use concise sentences and appropriate line breaks to improve readability.
                    - Include emojis only when they enhance the tone and engagement.
                    - Include 3–8 highly relevant hashtags at the end of the post. Avoid generic or unrelated hashtags.
                    - Adapt the writing style to the topic instead of using repetitive templates.
                    - Do not use clickbait, misleading claims, excessive capitalization, or hashtag stuffing.
                    - Keep the content authentic, conversational, and optimized for high engagement.

                    Output Rules:
                    - Generate exactly one post.
                    - Do not provide multiple options, variations, explanations, introductions, or notes.
                    - Do not wrap the response in quotes.
                    - Do not include labels such as "Post:", "Caption:", or "Here's your post:".
                    - Do not use Markdown formatting such as **, *, _, headings, bullet points, or code blocks.
                    - Output only the final post content.`
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
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { content: rawText };

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

    } catch (error: any) {
        console.error('Error in generatePost:', error);
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Get generated posts
// GET /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const generation = await Generation.find({
            user: req.user._id
        }).sort({ createdAt: -1 })

        res.json(generation)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" })
    }
}

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({ user: req.user._id })
        res.json(posts)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" })
    }
}

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { content, mediaUrl, mediaType, platforms, scheduledFor, status } = req.body


        let parsedPlatforms = platforms;
        if (typeof platforms === "string") {
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
        res.status(500).json({ message: error?.message || "Server error" })
    }
}

// Upload media to Cloudinary
// POST /api/posts/upload
export const uploadMedia = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { media } = req.body;
        if (!media) {
            res.status(400).json({ message: "No media content provided" });
            return;
        }

        const uploadResponse = await cloudinary.uploader.upload(media, {
            folder: "socialsync",
            resource_type: "auto"
        });

        res.json({
            success: true,
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        });
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ message: error?.message || "Cloudinary upload failed" });
    }
}

// Update generated post
// PUT /api/posts/generations/:id
export const updateGeneration = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            res.status(400).json({ message: "Content is required" });
            return;
        }

        const generation = await Generation.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { content },
            { new: true }
        );

        if (!generation) {
            res.status(404).json({ message: "Generation not found" });
            return;
        }

        res.json(generation);
    } catch (error: any) {
        console.error("Error updating generation:", error);
        res.status(500).json({ message: error?.message || "Server error" });
    }
}
