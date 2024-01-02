"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserSchema_1 = require("./dataBase/UserSchema");
const auth_1 = __importDefault(require("./authentication/auth"));
const stockGainerLoser_1 = __importDefault(require("./stockRoutes/stockGainerLoser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const socket_io_1 = require("socket.io");
// const { log } = require("console");
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
const path = require("path");
UserSchema_1.db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
UserSchema_1.db.once("open", () => {
    console.log("Connected to MongoDB");
});
//------- socket -------//
exports.io = new socket_io_1.Server(server, {
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
app.use("/auth", auth_1.default);
app.use("/stocks", (req, res, next) => {
    next();
}, stockGainerLoser_1.default);
server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
