import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
	.connect("mongodb+srv://root:root@full-stack-mern.dajqsnx.mongodb.net/admin-mern")
	.then(() => console.log("MongoDb is connected"))
	.catch((err) => console.error(err, "Error connecting database"));

const app = express();

app.use(express.json());

app.use(cookieParser());

const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// middleware for error
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
