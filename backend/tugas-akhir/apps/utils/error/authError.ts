import { WebError } from "./base/base";

export class UnauthenticatedError extends WebError {
  constructor(message: string) {
    super("UnauthenticatedError", 401, message);
  }
}

export class UnathorizedError extends WebError {
  constructor(message: string) {
    super("UnauthorizedError", 403, message);
  }
}
