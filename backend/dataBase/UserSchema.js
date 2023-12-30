const mongoose = require("mongoose");

mongoose.connect(process.env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  secPass: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { db, User };
