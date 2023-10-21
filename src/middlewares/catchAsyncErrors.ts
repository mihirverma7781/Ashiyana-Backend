/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const CatchAsyncErrors =
  (theFunc: any) =>
  (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(theFunc(request, response, next)).catch(next);
  };
