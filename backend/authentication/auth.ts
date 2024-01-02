import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../dataBase/UserSchema"; // Import the User model from your db file
import bcrypt from "bcrypt";
const key: string | undefined = process.env.key;
import authenticateJwt from "../middleware/auth";
const router = express.Router();
import { z } from "zod";
let UserDetails = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().min(6),
  password: z.string().min(6),
});
router.post("/signup", async (req, res) => {
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
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(password, salt);
    console.log({ hashedPassword: secPass });
  } catch (error) {
    console.log({ error: error });
  }
  User.findOne({ email })

    .then((user) => {
      if (user) {
        console.log("User already exists");
        res.status(409).json({ message: "User already exists" });
      } else {
        const newUser = new User({ firstName, lastName, email, secPass });
        newUser
          .save()
          .then((savedUser) => {
            // console.log("User saved successfully:", savedUser);
            if (key) {
              const token = jwt.sign({ email }, key, {
                expiresIn: "1h",
              });
              res.json({ message: "User created successfully", token });
            } else {
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user === null || user === undefined || user.secPass == null) {
      console.log("User does not exist or invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.secPass);
    if (passwordMatch) {
      console.log("You are logged in");
      if (key) {
        const token = jwt.sign({ email }, key, { expiresIn: "1h" });
        return res.json({ message: "User logged in successfully", token });
      } else {
        console.error("JWT key is not defined");
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      console.log("User does not exist or invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// router.post("/me", authenticateJwt, (req, res) => {
//   const user = req.user;
//   if (user) {
//     res.json({ email: user });
//   } else {
//     res.status(401).json({ message: "user doesnot exist" });
//   }
// });
router.post("/me", authenticateJwt, (req, res) => {
  const user = req.headers["user"];
  if (user) {
    res.json({ email: user });
  } else {
    res
      .status(401)
      .json({ message: "User does not exist or is not authenticated" });
  }
});

export default router;
