import { Models } from "../model";

declare global {
  namespace Express {
    interface Request {
      currentUser: Models.IUser;
    }
  }
}
