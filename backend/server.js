dotenv.config({ path: "../.env" });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);

// TODO: reduce file size to 5mb
app.use(express.json({ limit: 52428800 })); // 5MB
app.use(express.urlencoded({ limit: 52428800, extended: true })); // 5MB

app.use(cookieParser());

var whitelist = [
	"http://localhost:3000",
	"http://localhost:5173",
	process.env.CLIENT_URL,
];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false };
		// disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

const corsMiddleware = cors(corsOptionsDelegate);

app.use(corsMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

httpServer.listen(PORT, () => {
	console.log("Server started at this port:" + PORT);
	connectDB();
});
