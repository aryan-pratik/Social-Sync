import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import ConnectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRouter.js";
import postRouter from "./routes/postRouter.js";
import activityRouter from "./routes/activityRoutes.js";
import { initScheduler } from "./services/scheduleService.js";
import cookieParser from "cookie-parser";

const app = express();

await ConnectDb()

// Middleware
const allowedOrigins = [
    "https://socialssync.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(o => o && origin.replace(/\/$/, "") === o.replace(/\/$/, ""))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth", authRouter)
app.use("/api/oauth", socialAuthRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/posts", postRouter)
app.use("/api/activity", activityRouter)


// This is used for scheduling posts 
initScheduler()

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err)
    res.status(500).send(err?.response?.data?.message || err?.message)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});