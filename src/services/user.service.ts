import ErrorHandler from "../utils/ErrorHandler.util";
import { Models } from "../@types/model";
import userModel from "../models/user.model";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const isEmailExist = await userModel.findOne({ email: email });
    if (isEmailExist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new ErrorHandler("Service error: " + error.message, 500);
  }
};
