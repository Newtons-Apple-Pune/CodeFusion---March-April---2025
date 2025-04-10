import { User } from "@prisma/client";

export interface ExtendedAuthRequest extends Request {
  loggedUser: User;
}