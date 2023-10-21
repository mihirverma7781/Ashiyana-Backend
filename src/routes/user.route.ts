import express from "express";
import { verifyMail } from "../controller/user.controller";
// import isAuthenticated from "../middlewares/auth";

const userRouter = express.Router();

// userRouter.post("/registration", registrationUser);
userRouter.post("/send-otp", verifyMail);

export default userRouter;
