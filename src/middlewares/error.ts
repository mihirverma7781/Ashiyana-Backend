/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorHandler from "../utils/ErrorHandler.util";
import { Request, Response, NextFunction } from "express";

export default function ErrorMiddleware(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodbid
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid! try again";
    err = new ErrorHandler(message, 400);
  }

  //Expired jwt error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired! try again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "MongoError") {
    const message = "Database error";
    err = new ErrorHandler(message, 400);
  }

  response.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
