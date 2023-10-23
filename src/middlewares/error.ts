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
  console.log("error name: " + err);
  // Wrong mongodbid
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    // Extract the field from the error message
    const field = err.message.match(/index: (\w+)/);

    if (field) {
      const message = `Duplicate ${field[1]} entered. This ${field[1]} must be unique.`;
      err = new ErrorHandler(message, 400);
    }
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
