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

  interface IProject extends Document {
    title: string;
    language: string;
    source: string;
    video: string;
    videoName: string;
    srt: string;
    rawScript: string;
    userId: string;
  }
}
