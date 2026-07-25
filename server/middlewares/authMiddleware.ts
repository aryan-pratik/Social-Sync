import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        next();
    } catch (error: any) {
        res.status(401).json({ message: error?.message || "Not authorized, token failed" });
        return;
    }
};