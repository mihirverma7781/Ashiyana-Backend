// register user

import { Request, Response, NextFunction } from "express";
import redis from "../configs/redis.config";
import { v4 as uuid } from "uuid";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { checkEmailExists } from "../services/user.service";
import ErrorHandler from "../utils/ErrorHandler.util";
import sendMail from "../utils/sendMail.util";

export const verifyMail = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email } = request.body;
      const emailRegexPattern: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const isEmail = emailRegexPattern.test(email);
      if (!email || !isEmail) {
        throw new ErrorHandler("Invalid Email Input", 400);
      }

      // check if email already exists
      const isEmailExist = checkEmailExists(email);
      if (!isEmailExist) {
        throw new ErrorHandler("Email already exists", 400);
      }

      const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
      const activationId = uuid().toString();
      const data = { activationCode, email };

      try {
        await sendMail({
          email: email,
          subject: "Activate your account",
          template: "activationMail.ejs",
          data,
        });

        await redis.set(activationId, JSON.stringify(data));
        response.status(200).json({
          success: true,
          message: "Please check your email to activate your account",
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const registrationUser = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
