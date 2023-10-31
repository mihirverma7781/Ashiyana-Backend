import express from "express";
import { uploadProject, userProjects } from "../controller/project.controller";
import { isAuthenticated } from "../middlewares/auth";

const projectRouter = express.Router();

projectRouter.post("/upload-project", isAuthenticated, uploadProject);

projectRouter.get("/projects", userProjects);

export default projectRouter;
