// register user

import { Request, Response, NextFunction } from "express";
import redis from "../configs/redis.config";
import { v4 as uuid } from "uuid";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { checkEmailExists, createUser } from "../services/user.service";
import ErrorHandler from "../utils/ErrorHandler.util";
import sendMail from "../utils/sendMail.util";
import userModel from "../models/user.model";
import sendToken from "../utils/token.util";

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
      const isEmailExist = await checkEmailExists(email);
      if (isEmailExist) {
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
          data: { activationId, email },
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
      const { activationId, name, email, otp, password } = request.body;
      if (!name || !activationId || !email || !otp || !password) {
        throw new ErrorHandler("Invalid Details", 400);
      }
      const activationDetails = JSON.parse(await redis.get(activationId));
      console.log(
        "🚀 ~ file: user.controller.ts:64 ~ activationDetails:",
        activationDetails
      );
      if (
        email === activationDetails.email &&
        parseInt(otp) === parseInt(activationDetails.activationCode)
      ) {
        // check if email already exists
        const isEmailExist = await checkEmailExists(email);
        if (isEmailExist) {
          throw new ErrorHandler("Email already exists", 400);
        }

        const newUserDetails = {
          name: name,
          email: email,
          password: password,
          isVerified: true,
        };

        await createUser(newUserDetails);
        return response.status(201).json({
          success: true,
        });
      } else {
        throw new ErrorHandler("Invalid OTP or MAIL Details", 400);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const loginUser = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        throw new ErrorHandler("Invalid Input", 400);
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid credentials", 400));
      }

      const isValidPassword = await user.comparePasswords(password);
      if (!isValidPassword) {
        return next(new ErrorHandler("Invalid credentials", 400));
      }
      sendToken(user, 200, response);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
