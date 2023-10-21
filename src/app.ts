import express, { Request, Response, Express } from "express";
export const app: Express = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./configs/environment.config";
import ErrorMiddleware from "./middlewares/error";

import userRouter from "./routes/user.route";
// import courseRouter from "./routes/course.route";

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    // origin: [config.getAppUri()],
  })
);

//routes
app.use("/api/v1", userRouter);
// app.use("/api/v1", courseRouter);

//test route
app.get("/test", (request: Request, response: Response) => {
  return response.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

// unknown routes
app.all("*", (request: Request, response: Response) => {
  const error = new Error(`Route ${request.originalUrl} not found`);
  return response.status(404).json({
    error: error.message,
  });
});

app.use(ErrorMiddleware);
