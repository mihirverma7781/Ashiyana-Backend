import mongoose, { Model, Schema } from "mongoose";
import { Models } from "../@types/model";

const projectSchema: Schema<Models.IProject> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    language: {
      type: String,
      required: [true, "Please enter a language"],
    },
    source: {
      type: String,
      required: [true, "Please enter a source"],
    },
    video: {
      type: String,
      required: [true, "Not a valid video url"],
    },
    videoName: {
      type: String,
      required: [true, "Not a valid video name"],
    },
    srt: {
      type: String,
    },
    rawScript: {
      type: String,
    },
    userId: {
      type: String,
      required: [true, "Invalid user"],
    }
  },
  { timestamps: true }
);

// Create a compound unique index on userId and title
projectSchema.index({ userId: 1, title: 1 }, { unique: true });

const projectModel: Model<Models.IProject> = mongoose.model(
  "Project",
  projectSchema
);

export default projectModel;
