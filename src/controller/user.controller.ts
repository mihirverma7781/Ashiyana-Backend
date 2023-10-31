// register user

import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors";
import {
  createUser,
} from "../services/user.service";
import ErrorHandler from "../utils/ErrorHandler.util";
import sendToken from "../utils/token.util";
import { Models } from "../@types/model.d";


export const registrationUser = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, email, phone } = request.body;
      if (!name || !email || !phone) {
        throw new ErrorHandler("Please enter all details", 400);
      }

      const newUserDetails = {
        name: name,
        email: email,
        phone: phone,
      };

      await createUser(newUserDetails);
      return response.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const loginUser = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const adminCreds: Models.IAdmin = {
        email: "admin@ashiyana.com",
        password: "admin@123",
      };
      const { email, password } = request.body;
      if (!email || !password) {
        throw new ErrorHandler("Invalid Input", 400);
      }

      if (email === adminCreds.email && password === adminCreds.password) {
        sendToken(adminCreds, 200, response);
      } else {
        return next(new ErrorHandler("Invalid credentials", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

