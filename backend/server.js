const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { db, User } = require("./dataBase/UserSchema");
const authRoutes = require("./authentication/auth");
const stockRoutes = require("./stockRoutes/stockGainerLoser");
const app = express();
app.use(bodyParser.json());
const { Server } = require("socket.io");
const { log } = require("console");
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

const io = new Server(server, {
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
    req.io = io;
    next();
  },
  stockRoutes
);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
