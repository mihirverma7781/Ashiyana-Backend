// authenticate user

import { NextFunction, Request, Response } from "express";
import { CatchAsyncErrors } from "./catchAsyncErrors";
import ErrorHandler from "utils/ErrorHandler.util";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../configs/environment.config";
import userModel from "models/user.model";

const isAuthenticated = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    const accessToken = request.cookies.access_token;
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access the resource.", 403)
      );
    }

    const decoded = jwt.verify(
      accessToken,
      config.getAccessToken()
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }
    request.currentUser = user;

    next();
  }
);
