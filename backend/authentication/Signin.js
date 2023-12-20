const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../dataBase/UserSchema"); // Import the User model from your db file
const key = process.env.key;
const authenticateJwt = require("../middleware/auth");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  User.findOne({ email })

    .then((user) => {
      if (user) {
        console.log("User already exists");
        res.status(409).json({ message: "User already exists" });
      } else {
        const newUser = new User({ firstName, lastName, email, password });
        newUser
          .save()
          .then((savedUser) => {
            console.log("User saved successfully:", savedUser);
            const token = jwt.sign({ email }, key, { expiresIn: "1h" });
            res.json({ message: "User created successfully", token });
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log("You are logged in");
        const token = jwt.sign({ email }, key, { expiresIn: "1h" });
        res.json({ message: "User logged in successfully", token });
      } else {
        console.log("User does not exist or invalid credentials");
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
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
  const user = req.user;
  if (user) {
    res.json({ email: user });
  } else {
    res
      .status(401)
      .json({ message: "User does not exist or is not authenticated" });
  }
});

module.exports = router;
