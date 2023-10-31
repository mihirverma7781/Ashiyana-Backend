import ErrorHandler from "../utils/ErrorHandler.util";
import { Models } from "../@types/model";
import userModel from "../models/user.model";

interface IUserInput {
  email: string;
  phone: string;
  name: string;
}

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
