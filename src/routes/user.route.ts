import express from "express";
import { loginUser, registrationUser, resetPassword, verifyMail } from "../controller/user.controller";
// import isAuthenticated from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/send-otp", verifyMail);
userRouter.post("/registration", registrationUser);
userRouter.post("/login", loginUser);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
