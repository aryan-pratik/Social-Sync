import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Db got connected")
        });
        await mongoose.connect(process.env.MONGO_URI as string);
    } catch (error: any) {
        console.error(error)
        process.exit(1)
    }
}

export default ConnectDb