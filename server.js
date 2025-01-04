import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import user from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
