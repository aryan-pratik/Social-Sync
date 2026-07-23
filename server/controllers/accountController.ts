import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";


// Get all accounts
// GET /api/accounts
export const getAccounts = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const accounts = await Account.find({user: req.user._id})

        res.status(200).json({
            success: true,
            data: accounts
        })
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

// Add account
// POST /api/accounts
export const addAccount = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const {platform, handle, avatarUrl} = req.body

        const account = await Account.create({user: req.user._id, platform, handle, avatarUrl})
        res.status(201).json(account)

    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

// Disconnect account
// DELETE /api/accounts/:id
export const disconnectAccount = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        const account = await Account.findOne({_id: req.params.id, user: req.user._id})
        if(!account) {
            res.status(404).json({message: "Account not found"})
            return;
        }

        if(account.zernioAccountId) {
            try {
                await zernio.accounts.deleteAccount({path: {account_id: account.zernioAccountId}});
            } catch (error: any) {
                console.log(`Error deleting Zernio account: ${error?.response?.me?.data.message || error?.message}`);
                return
            }
        }

        await account.deleteOne();
        res.status(200).json({message: "Account disconnected successfully"});
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Sever error"})
    }
}