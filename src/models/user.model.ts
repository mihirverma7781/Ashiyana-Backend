import mongoose, { Model, Schema } from "mongoose";
import { Models } from "../@types/model";

const emailRegexPattern: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const mobileRegexPattern: RegExp = /^[6-9]{1}[0-9]{9}$/;

const userSchema: Schema<Models.IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter a Phone Number"],
      validate: {
        validator: function (value: string) {
          return mobileRegexPattern.test(value);
        },
        message: "please enter a valid number",
      },
    },
  },
  { timestamps: true }
);

const userModel: Model<Models.IUser> = mongoose.model("User", userSchema);

export default userModel;
