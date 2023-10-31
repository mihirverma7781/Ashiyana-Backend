import express from "express";
import { loginUser, registrationUser } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/auth";
// import isAuthenticated from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/login", loginUser);

export default userRouter;
