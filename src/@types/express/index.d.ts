import { Models } from "../model";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
      files?: File;
    }

    interface File {
      location?: string; // Add a 'location' property to the File object
    }
  }
}
