import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express';
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import connectDB from './lib/database.js';

dotenv.config()

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname , 'tmp'),
    createParentPath: true,
    limit:{
        fileSize: 10 * 1024 * 1024
    }
}))



app.use("/api/users" , userRoutes)
app.use("/api/auth" , authRoutes)
app.use("/api/admin" , adminRoutes)
app.use("/api/songs" , songRoutes)
app.use("/api/albums" , albumRoutes)
app.use("/api/stats" , statRoutes)

app.use((err,req, res , next) => {
    res.status(500).json({message : process.env.NODE_ENV === "development" ? err.message : "Internal Server Error"})
})



app.listen(5000, () => {
    console.log("Server is running on port " + PORT);
    connectDB()
});