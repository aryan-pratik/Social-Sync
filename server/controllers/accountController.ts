import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";


// Get all accounts
// GET /api/accounts
export const getAccounts = async (req: AuthRequest, res: Response) : Promise<void> => {
    try {
        // 1. Return from MongoDB instantly (~15ms)
        const accounts = await Account.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            data: accounts
        });

        // 2. Perform Zernio reconciliation asynchronously in background (non-blocking)
        if (req.user.zernioProfileId) {
            zernio.accounts.listAccounts({ query: { profileId: req.user.zernioProfileId } as any })
                .then(async (result: any) => {
                    const data = result.data as any;
                    const zernioAccounts: any[] = data?.accounts || (Array.isArray(data) ? data : []);
                    const activeZernioIds = zernioAccounts.map(a => a._id || a.id).filter(Boolean);

                    await Account.deleteMany({
                        user: req.user._id,
                        zernioAccountId: { $exists: true, $ne: null, $nin: activeZernioIds }
                    });
                })
                .catch((err: any) => {
                    console.warn("Background Zernio sync warning:", err?.message || err);
                });
        }
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

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

        // console.log(account)
        if(account.zernioAccountId) {
            try {
                await zernio.accounts.deleteAccount({ path: { accountId: account.zernioAccountId } });
            } catch (error: any) {
                console.log(`Error deleting Zernio account: ${error?.response?.data?.message || error?.message}`);
            }
        }

        await account.deleteOne();
        res.status(200).json({ message: "Account disconnected successfully" });
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Sever error"})
    }
}