import {Request, Response} from "express";
import zernio from "../config/zernio.js";
import { User } from "../models/User.js";
import { Account } from "../models/Account.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";


const getOrCreateZernioProfile = async (user: any): Promise<string> => {
    try {
        if (user.zernioProfileId) {
            return user.zernioProfileId;
        }

        const result = await zernio.profiles.listProfiles();
        const data = result.data as any;
        const profiles: any[] = Array.isArray(data) ? data : data?.profiles || data?.data || [];

        const targetName = `${user.name || user.email}'s workspace`;
        const existingProfile = profiles.find((p: any) => p.name === targetName);

        if (existingProfile) {
            const pid = existingProfile._id || existingProfile.id;
            await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
            return pid;
        }

        const createResult = await zernio.profiles.createProfile({
            body: { name: targetName } as any,
        });
        const created = (createResult.data as any)?.profile || createResult.data;

        const pid = created?._id || created?.id;

        if (!pid) {
            throw new Error("Failed to create Zernio profile, no ID returned");
        }

        await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
        return pid;

    } catch (error: any) {
        console.error(error);
        throw error;
    }
}; 

// GET /api/auth/:platform
export const generateAuthUrl = async (req: AuthRequest, res: Response) : Promise<void> => {
    
    try {
        const {platform} = req.params;
        const profileId = await getOrCreateZernioProfile(req.user)

        const origin = req.headers.origin
        const redirectUrl = `${origin}/accounts`

        const result = await zernio.connect.getConnectUrl({
            path: {platform: platform as any},
            query: {
                profileId,
                redirect_url: redirectUrl,
                
            }
        })

        const data = result.data as any;
        console.log("get connectUrl response: ", JSON.stringify(data, null, 2))
        
        const authUrl = data.authUrl;
        if(!authUrl) {
            throw new Error(`Zernio returned no authUrl Full response:${JSON.stringify(data)}`)
        }

        res.json({url: authUrl})
        return

    } catch (error : any) {
        res.status(500).json({message: error?.message || "Server error"})
        return
    }
}

// Sync connected accounts from Zernio into MongoDb
// GET /api/auth/sync
export const syncAccounts = async (req: AuthRequest, res: Response) : Promise<void> => {

    try {
        const profileId = await getOrCreateZernioProfile(req.user)

        // console.log("Profile ID:", profileId);


        const result = await zernio.accounts.listAccounts({
            query: {profileId} as any
        })

        const data = result.data as any;

        // console.log("========== ZERNIO RESPONSE ==========");
        // console.dir(data, { depth: null });
        // console.log("=====================================");


        const zernioAccounts: any[] = data?.accounts || (Array.isArray(data) ? data : []);
        const activeZernioIds = zernioAccounts.map(a => a._id || a.id).filter(Boolean);

        // Delete any local account record for this user if it was removed on Zernio
        await Account.deleteMany({
            user: req.user._id,
            zernioAccountId: { $exists: true, $ne: null, $nin: activeZernioIds }
        });

        const supportedPlatforms = ["instagram", "facebook", "twitter", "linkedin"];
        const syncedAccounts = [];

        for(const zAccount of zernioAccounts) {
            const zid = zAccount._id || zAccount.id;
            if(!zid) {
                console.warn("Skipping account with no ID")
                continue;
            }

            const rawPlatform = (zAccount.platform || zAccount.types || "").toLowerCase()
            const normalizedPlatfrom = supportedPlatforms.find((p: string) => rawPlatform.includes(p))

            if(!normalizedPlatfrom) {
                console.log(`Skipping unsupported platform: ${rawPlatform}`)
                continue
            }

            const account = await Account.findOneAndUpdate( 
                { zernioAccountId: zid, user: req.user._id },
                {
                    user: req.user._id,
                    platform: normalizedPlatfrom,
                    handle: zAccount.username || zAccount.name || zAccount.profile_image_url,
                    zernioAccountId: zid,
                    status: "connected",
                    avatarUrl: zAccount.avatarUrl || zAccount.picture || zAccount.profile_image_url
                },
                { upsert: true, returnDocument: 'after' }
            )
            syncedAccounts.push(account)
        }
        res.json({syncedAccounts})

    } catch (error : any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
    
}