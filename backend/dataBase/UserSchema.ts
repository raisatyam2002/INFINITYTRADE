import mongoose from "mongoose";
const url: string | undefined = process.env.mongoUrl;
if (!url) {
  throw new Error("MongoDB URL is not defined");
}
mongoose.connect(url);

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  secPass: String,
});

const User = mongoose.model("User", userSchema);

export { db, User };
