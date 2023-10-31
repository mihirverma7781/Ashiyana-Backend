/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import config from "../configs/environment.config";
import Util from "../@types/util";
import jwt from "jsonwebtoken";
import { Models } from "../@types/model";

// parse env variables to integrate with fallback values
const accessTokenExpire = parseInt(config.getAccessTokenExpiry(), 10);

// options for cookies
export const accessTokenOptions: Util.ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

const sendToken = async (
  user: Models.IAdmin,
  statusCode: number,
  response: Response
) => {
  const accessToken = jwt.sign({ email: user.email }, config.getAccessToken());

  //only set secure to true in production environment
  if (config.getNodeEnv() === "production") {
    accessTokenOptions.secure = true;
  }

  response.cookie("access_token", accessToken, accessTokenOptions);

  return response.status(statusCode).json({
    success: true,
    accessToken,
  });
};

export default sendToken;
