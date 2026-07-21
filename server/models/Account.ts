import Zernio from "@zernio/node";
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    platform: {
        types: String,
        enum: ['twitter', "linkedin", "facebook", "instagram"],
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    ZernioAccountId: {
        type: String, 
    },
    refreshToken: {
        type: String
    },
    tokenExpiresAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ["connected", "disconnected"],
        default: "connected"
    },
    avatarUrl: {
        type: String
    }
},{
    timestamps: true,
})

export const Account = mongoose.model("Account", accountSchema)

    
