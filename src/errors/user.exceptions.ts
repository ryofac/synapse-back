import { HttpExcpetion } from "./http.exception";

export class UserNotFoundException extends HttpExcpetion {
  constructor() {
    super("User requested not found", 404, "USER_NOT_FOUND");
  }
}
