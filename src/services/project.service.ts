import ErrorHandler from "../utils/ErrorHandler.util";

import projectModel from "../models/project.model";

export const createProject = async (
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
) => {
  try {
    const createNewProject = await projectModel.create({
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
    });
    if (createNewProject) {
      return createNewProject;
    } else {
      throw new ErrorHandler("Service Error: Project Not Created", 400);
    }
  } catch (error) {
    throw new ErrorHandler("Service Error: " + error.message, 500);
  }
};

export const getAllUserProjects = async () => {
  try {
    const projects = await projectModel.find();
    return projects;
  } catch (error) {
    throw new ErrorHandler("Service Error: " + error.message, 500);
  }
};
