import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler.util";
import { createProject, getAllUserProjects } from "../services/project.service";

interface MulterRequest extends Request {
  files?: any;
}

export const uploadVideo = CatchAsyncErrors(
  async (request: MulterRequest, response: Response, next: NextFunction) => {
    try {
      const { projectName, language, source } = request.body;
      const user = request.currentUser;
      if (!projectName || !language || !source) {
        throw new ErrorHandler("Please provide correct project info", 400);
      }
      if (!user) throw new ErrorHandler("Unauthorized", 401);
      if (request.files && Object.keys(request.files)?.length) {
        const annotation = request.files.annotation[0].location;
        const fileName = request.files.annotation[0].originalname;
        const srt = request.files.srt[0].location;
        const rawScript = request.files.rawScript[0].location;

        const project = await createProject(
          projectName,
          language,
          source,
          annotation,
          fileName,
          user.id,
          srt,
          rawScript
        );
        return response.status(201).json({
          success: true,
          message: "Project successfully created",
          data: project,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const userProjects = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.currentUser;
      const projects = await getAllUserProjects(user._id);
      return response.status(200).json({
        success: true,
        message: "Project fetched successfully",
        data: projects,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
