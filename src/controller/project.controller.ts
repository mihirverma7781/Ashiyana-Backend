import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler.util";
import { createProject, getAllUserProjects } from "../services/project.service";

export const uploadProject = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        name,
        status,
        description,
        location,
        projectIRR,
        minInvestment,
        tenure,
        monthlyAvg,
        area,
        overview,
        distance,
        aminities,
        faq,
      } = request.body;
      const user = request.currentUser;
      if (
        !name ||
        !status ||
        !description ||
        !location ||
        !projectIRR ||
        !minInvestment ||
        !tenure ||
        !monthlyAvg ||
        !area ||
        !overview ||
        !distance ||
        !aminities ||
        !faq
      ) {
        throw new ErrorHandler("Please provide correct project info", 400);
      }
      if (!user) throw new ErrorHandler("Unauthorized", 401);

      const project = await createProject(
        name,
        status,
        description,
        location,
        projectIRR,
        minInvestment,
        tenure,
        monthlyAvg,
        area,
        overview,
        distance,
        aminities,
        faq
      );
      return response.status(201).json({
        success: true,
        message: "Project successfully created",
        data: project,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const userProjects = CatchAsyncErrors(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.currentUser;
      const projects = await getAllUserProjects();
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
