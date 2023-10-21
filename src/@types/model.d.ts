import { Document } from "mongoose";

declare namespace Models {
  interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    comparePasswords: (password: string) => Promise<boolean>;
    signAccessToken: () => string;
  }
}
