import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { db, User } from "./dataBase/UserSchema";
import authRoutes from "./authentication/auth";
import stockRoutes from "./stockRoutes/stockGainerLoser";
const app = express();
app.use(bodyParser.json());
import { Server } from "socket.io";
// const { log } = require("console");
const server = http.createServer(app);
app.use(cors());
const path = require("path");

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
//------- socket -------//

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ----- socket done --//
const key = process.env.key;

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use("/auth", authRoutes);

app.use(
  "/stocks",

  (req, res, next) => {
    next();
  },
  stockRoutes
);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
