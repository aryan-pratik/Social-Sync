import { Response } from "express";
import { ActivityLog } from "../models/ActivityLog.js";
import { Post } from "../models/Post.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

// Get all activity
// GET /api/activity
export const getActivity = async(req: AuthRequest, res: Response): Promise<void> => {
    try {
        const logs = await ActivityLog.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        const posts = await Post.find({ user: req.user._id })
            .sort({ updatedAt: -1 })
            .limit(10);

        const postActivities = posts.map(p => {
            const platformList = (p.platforms || []).map((plat: string) => plat.charAt(0).toUpperCase() + plat.slice(1)).join(", ");
            const actionType = p.status === 'published' ? 'POST_PUBLISHED' : p.status === 'scheduled' ? 'POST_SCHEDULED' : 'POST_FAILED';
            const description = p.status === 'published' 
                ? `Post published to ${platformList || "connected channels"}` 
                : p.status === 'scheduled' 
                ? `Post scheduled for ${platformList || "connected channels"}` 
                : `Post failed/not published on ${platformList || "connected channels"}`;

            return {
                _id: `post_${p._id}`,
                actionType,
                description,
                createdAt: p.updatedAt || p.createdAt,
                content: p.content
            };
        });

        const allActivities = [...logs.map(l => l.toObject()), ...postActivities];
        
        // Remove duplicate descriptions within same 2-minute window and sort by date desc
        const uniqueMap = new Map();
        for (const item of allActivities) {
            const timeKey = new Date(item.createdAt).toISOString().slice(0, 15);
            const key = `${item.actionType}_${timeKey}`;
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            }
        }

        const sortedActivities = Array.from(uniqueMap.values())
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10);

        res.json({ activity: sortedActivities });
    } catch(error: any) {
        res.status(500).json({ message: error?.message || "Server error"});
    }
};