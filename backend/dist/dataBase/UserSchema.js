"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = process.env.mongoUrl;
if (!url) {
    throw new Error("MongoDB URL is not defined");
}
mongoose_1.default.connect(url);
const db = mongoose_1.default.connection;
exports.db = db;
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    secPass: String,
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
