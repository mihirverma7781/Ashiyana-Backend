import mongoose, { Model, Schema } from "mongoose";
import { Models } from "../@types/model";

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const projectSchema: Schema<Models.IProject> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    status: {
      type: String,
      required: [true, "Please enter a status"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    location: {
      type: String,
      required: [true, "Not a valid location"],
    },
    projectIRR: {
      type: String,
    },
    minInvestment: {
      type: String,
    },
    tenure: {
      type: String,
    },
    monthlyAvg: {
      type: String,
    },
    area: {
      type: String,
    },
    overview: {
      type: [String],
    },
    distance: {
      type: [String],
    },
    aminities: {
      type: [String],
    },
    faq: [faqSchema],
  },
  { timestamps: true }
);

const projectModel: Model<Models.IProject> = mongoose.model(
  "Project",
  projectSchema
);

export default projectModel;
