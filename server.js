import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRouter from "./routers/todosRouter.js";
import userRouter from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionSuccessStatus: 200,
};

const PORT = 5000;

const DB_URL = process.env.DB_URL;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("", todoRouter);
app.use("", userRouter);
app.use(errorMiddleware);
async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log("SERVER START ON PORT" + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
