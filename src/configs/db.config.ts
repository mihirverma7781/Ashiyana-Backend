/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "./environment.config";

const connectDB = async () => {
  try {
    const DB_URL: string = config.getDBUri() || "";
    await mongoose.connect(DB_URL).then((data: any) => {
      console.log(`connection connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
