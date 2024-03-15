import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/User.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);

const mongoUrl =
  "mongodb+srv://philipbwalya2000:12345@zamtouch.jpviz7v.mongodb.net/authentication?retryWrites=true&w=majority&appName=zamtouch";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to the db");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server is running");
});

// app.post("/post", (req, res) => {
//   console.log(req.body);
//   const { data } = req.body;
// });

// const User = mongoose.model("User");

// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     await User.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//     });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//     console.error;
//   }
// });
