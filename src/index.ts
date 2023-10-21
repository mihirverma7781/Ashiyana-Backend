import { app } from "./app";
import connectDB from "./configs/db.config";
import config from "./configs/environment.config";
// import { v2 as cloudinary } from "cloudinary";

// Creating Server
app.listen(config.getPort(), () => {
  console.log(`Server is connected to ${config.getPort()}`);
  connectDB();
});
