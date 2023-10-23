import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../configs/environment.config";
import { Models } from "../@types/model";

const emailRegexPattern: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    password: {
      type: String,
      minlength: [6, "Password must be atleast 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    settings: {
      fontSize: {
        type: Number,
        default: 12,
      },
      confidenceThreshold: {
        type: Number,
        default: 0.45,
      },
      confidenceHighlightColor: {
        type: String,
        default: "red",
      },
      transcriptHighlightColor: {
        type: String,
        default: "gray",
      },
      textColor: {
        type: String,
        default: "black",
      },
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre<Models.IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, config.getAccessToken(), {
    expiresIn: "2d",
  });
};

// Compare password
userSchema.methods.comparePasswords = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<Models.IUser> = mongoose.model("User", userSchema);

export default userModel;
