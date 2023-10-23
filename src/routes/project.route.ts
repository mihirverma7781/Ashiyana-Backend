import express from "express";
import { uploadVideo, userProjects } from "../controller/project.controller";
import { upload } from "../configs/multer.config";
import { isAuthenticated } from "../middlewares/auth";

const projectRouter = express.Router();

projectRouter.post(
  "/upload-video",
  isAuthenticated,
  upload.fields([
    { name: "annotation", maxCount: 1 },
    { name: "srt", maxCount: 1 },
    { name: "rawScript", maxCount: 1 },
  ]),
  uploadVideo
);

projectRouter.get("/projects", isAuthenticated, userProjects);

export default projectRouter;
