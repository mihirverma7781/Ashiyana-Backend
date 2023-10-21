import ErrorHandler from "../utils/ErrorHandler.util";
import { Models } from "../@types/model";
import userModel from "../models/user.model";

interface IUserInput {
  email: string;
  password: string;
  name: string;
}

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

export const createUser = async (userData: IUserInput) => {
  try {
    const createUser = await userModel.create(userData);
    if (createUser) {
      return createUser;
    } else {
      throw new ErrorHandler("Service Error: User not created", 400);
    }
  } catch (error) {
    throw new ErrorHandler("Service Error: " + error.message, 500);
  }
};

export const updatePassword = async (email: string, password: string) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );
    if (updatedUser) {
      return updatedUser;
    } else {
      throw new ErrorHandler("Service Error: User not updated", 400);
    }
  } catch (error) {
    throw new ErrorHandler("Service Error: " + error.message, 500);
  }
};
