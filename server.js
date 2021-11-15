import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRouter from "./routers/todosRouter.js";
import userRouter from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { Server } from "socket.io";
import http from "http";
import TokenModel from "./models/token.js";
import UserModel from "./models/user.js";

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
    httpServer.listen(PORT, () => console.log("SERVER START ON PORT" + PORT));
  } catch (e) {
    console.log(e);
  }
}
const httpServer = http.Server(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});
io.on("connection", (socket) => {
  socket.on("login", async (data) => {
    const tokenData = await TokenModel.findOne({ accessToken: data });
    const user = await UserModel.findOne(tokenData._id);
    socket.join(`${user._id}`);
    socket.on("ADD_TODO", (data) => {
      socket.to(`${user._id}`).emit("TODO_ADDED", data);
    });
    socket.on("DELETE_TODO", (data) => {
      socket.to(`${user._id}`).emit("TODO_DELETED", data);
    });
    socket.on("UPDATE_TODO", (data) => {
      socket.to(`${user._id}`).emit("TODO_UPDATED", data);
    });
    socket.on("CLEAR_COMPLETED_TODOS", (data) => {
      socket.to(`${user._id}`).emit("COMPLETED_TODOS_CLEAR", data);
    });
    socket.on("TOGGLE_STATUS_TODOS", (data) => {
      socket.to(`${user._id}`).emit("TODOS_STATUS_TOGGLED", data);
    });
  });
});

startApp();
