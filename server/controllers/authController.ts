import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../models/User.js";

const generateToken = (id : string) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "fallback_secret", {expiresIn: "60d"})
}


// POST /api/auth/register
export const registerUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message: "User Already Exists"})
            return
        } 
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if(user) {
            res.status(201).json({message: "User Created Successfully", id: user._id, name: user.name, email: user.email, token: generateToken(user._id.toString())})
            return
        } else {
            res.status(400).json({message: "Invalid User Data"})
            return
        }
    } catch (error : any) {
        res.status(500).json({message: error?.message ||"Internal Server Error"})
        return
    }
}


// POST /api/auth/login
export const loginUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            res.json({id: user._id, name: user.name, email: user.email, token: generateToken(user._id.toString())})
            return
        } else {
            res.status(401).json({message: "Invalid Email or Password"})
            return
        }
    } catch (error : any) {
        res.status(500).json({message: error?.message ||"Internal Server Error"})
        return
    }
}
    
