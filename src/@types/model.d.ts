import { Document } from "mongoose";

declare namespace Models {
  interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    settings: IUserSettings;
    comparePasswords: (password: string) => Promise<boolean>;
    signAccessToken: () => string;
  }

  interface IUserSettings  {
    fontSize: number;
    confidenceThreshold: number;
    confidenceHighlightColor: string;
    transcriptHighlightColor: string;
    textColor: string;
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
