"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema_1 = require("../dataBase/UserSchema"); // Import the User model from your db file
const bcrypt_1 = __importDefault(require("bcrypt"));
const key = process.env.key;
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
const zod_1 = require("zod");
let UserDetails = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().min(6),
    password: zod_1.z.string().min(6),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pasrsedInput = UserDetails.safeParse(req.body);
    if (!pasrsedInput.success) {
        res.status(411).json({
            message: "Email and password must be at least 9 characters long.",
        });
        return;
    }
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    var secPass = "";
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        secPass = yield bcrypt_1.default.hash(password, salt);
        console.log({ hashedPassword: secPass });
    }
    catch (error) {
        console.log({ error: error });
    }
    UserSchema_1.User.findOne({ email })
        .then((user) => {
        if (user) {
            console.log("User already exists");
            res.status(409).json({ message: "User already exists" });
        }
        else {
            const newUser = new UserSchema_1.User({ firstName, lastName, email, secPass });
            newUser
                .save()
                .then((savedUser) => {
                // console.log("User saved successfully:", savedUser);
                if (key) {
                    const token = jsonwebtoken_1.default.sign({ email }, key, {
                        expiresIn: "1h",
                    });
                    res.json({ message: "User created successfully", token });
                }
                else {
                    // Handle the case where key is undefined
                    console.error("JWT key is not defined");
                    res.status(500).json({ message: "Internal Server Error" });
                }
            })
                .catch((err) => {
                console.error("Error saving user:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
        }
    })
        .catch((err) => {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal Server Error" });
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserSchema_1.User.findOne({ email });
        if (user === null || user === undefined || user.secPass == null) {
            console.log("User does not exist or invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.secPass);
        if (passwordMatch) {
            console.log("You are logged in");
            if (key) {
                const token = jsonwebtoken_1.default.sign({ email }, key, { expiresIn: "1h" });
                return res.json({ message: "User logged in successfully", token });
            }
            else {
                console.error("JWT key is not defined");
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
        else {
            console.log("User does not exist or invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
// router.post("/me", authenticateJwt, (req, res) => {
//   const user = req.user;
//   if (user) {
//     res.json({ email: user });
//   } else {
//     res.status(401).json({ message: "user doesnot exist" });
//   }
// });
router.post("/me", auth_1.default, (req, res) => {
    const user = req.headers["user"];
    if (user) {
        res.json({ email: user });
    }
    else {
        res
            .status(401)
            .json({ message: "User does not exist or is not authenticated" });
    }
});
exports.default = router;
