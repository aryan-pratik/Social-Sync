import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

const generateToken = (id : string) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "fallback_secret", {expiresIn: "60d"})
}


// POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const sanitizedEmail = email ? email.toLowerCase().trim() : "";

        // 1. Check if user already exists
        const userExist = await User.findOne({ email: sanitizedEmail });
        if (userExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // 2. Hash password & create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name?.trim(),
            email: sanitizedEmail,
            password: hashedPassword
        });

        // 3. Return success response (NO token/cookie needed)
        res.status(201).json({
            message: "User registered successfully! Please sign in.",
            id: user._id,
            name: user.name,
            email: user.email
        });
        return;

    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Internal Server Error" });
        return;
    }
};



// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const sanitizedEmail = email ? email.toLowerCase().trim() : "";

        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        //  Generate token & set cookie ONLY on Sign In
        const token = generateToken(user._id.toString());
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({
            message: "Successfully logged in",
            id: user._id,
            name: user.name,
            email: user.email
        });
        return;

    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Internal Server Error" });
        return;
    }
};

// POST /api/auth/logout
export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });
    res.status(200).json({ message: "Logged out successfully" });
};

// GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
};

