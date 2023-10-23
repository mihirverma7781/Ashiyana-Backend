import ErrorHandler from "../utils/ErrorHandler.util";

import projectModel from "../models/project.model";

export const createProject = async (
  title: string,
  language: string,
  source: string,
  videoUrl: string,
  videoName: string,
  userId: string,
  srt: string,
  rawScripts: string,
) => {
  try {
    const createNewProject = await projectModel.create({
      title: title,
      language: language,
      source: source,
      video: videoUrl,
      videoName: videoName,
      userId: userId,
      srt: srt,
      rawScripts: rawScripts,
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
