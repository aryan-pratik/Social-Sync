import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import ConnectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();

await ConnectDb()

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth" , authRouter)
app.use("/api/oauth" , socialAuthRouter)
app.use("/api/accounts" , accountRouter)
app.use("/api/post", postRouter)

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => { 
    console.log(err)
    res.status(500).send(err?.response?.data?.message || err?.message)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});