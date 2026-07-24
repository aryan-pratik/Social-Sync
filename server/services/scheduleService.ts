import cron from "node-cron"
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";
import { ActivityLog } from "../models/ActivityLog.js";

export const initScheduler = async () => {
    cron.schedule("* * * * *", async () => {

        try {
            const now = new Date();
            const postsToPublish = await Post.find({
                status: "scheduled",
                scheduledFor: {
                    $lte: now
                }});

            for (const post of postsToPublish) {
                try {
                    const accounts = await Account.find({
                        user: post.user,
                        platform: {
                            $in: post.platforms
                        },
                        status: "connected",
                        zernioAccountId: {$exists: true}
                    } as any);

                    if(accounts.length === 0) {
                        console.log(`No connected Zernio accounts found for post ${post._id}`)
                        post.status = "failed";
                        await post.save();
                        continue;
                    }

                    const zernioPlatforms = accounts.map((acc) => ({
                        platform: acc.platform as any,
                        accountId: acc.zernioAccountId!,
                    }))

                    const payload: any = {
                        content: post.content,
                        publishNow: true,
                        platforms: zernioPlatforms,
                    }

                    if (post.mediaUrl) {
                        payload.mediaUrl = post.mediaUrl;
                    }

                    console.log(`Publishing post ${post._id} to ${JSON.stringify(zernioPlatforms)}`)

                    const response = await zernio.posts.createPost({
                        body: payload
                    })

                    const publishedPost = (response.data as any)?.post || response.data

                    if(!publishedPost) {
                        throw new Error("Failed to get post object from the Zernio data")
                    }

                    console.log(`Zernio post created : ${publishedPost._id || publishedPost.id}`)

                    post.status = "published"
                    await post.save()

                    await ActivityLog.create({
                        user: post.user,
                        actionType: "POST_PUBLISHED",
                        description: `Post published to ${accounts.map((a) => a.platform).join(", ")}`,
                        relatedPost: post._id,
                    })

                    console.log(`Activity logged for post ${post._id}`)

                } catch (error : any) {
                    console.error(`Failed to publish post ${post._id} :`, error?.response?.data || error?.message)
                    post.status = "failed";
                    await post.save();
                }
            }

            if(postsToPublish.length > 0) {
                console.log(`Evaluated ${postsToPublish.length} posts at ${now.toISOString()}`) 
            }
        } catch (error: any) {
            console.error("Error in scheduler cron job:", error);
        }
        
    });
    console.log("Scheduler is initalized");
};
