const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { db, User } = require("./dataBase/UserSchema");
const authRoutes = require("./authentication/auth");
const stockRoutes = require("./stockRoutes/stockGainerLoser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
const key = process.env.key;

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
app.use("/auth", authRoutes);
app.use("/stocks", stockRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
