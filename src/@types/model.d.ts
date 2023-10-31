import { Document } from "mongoose";

declare namespace Models {
  interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
  }

  interface IAdmin {
    email: string;
    password: string;
  }

  interface IFaq {
    question: string;
    answer: string;
  }

  interface IProject extends Document {
    name: string;
    status: string;
    description: string;
    location: string;
    minInvestment: string;
    tenure: string;
    projectIRR: string;
    monthlyAvg: string;
    area: string;
    overview: string[];
    distance: string[];
    aminities: string[];
    faq: IFaq[];
  }
}

// name, status, description, location, projectIRR, minInvestment,tenure, monthlyAvg, area, overview, distance, aminities, faq
