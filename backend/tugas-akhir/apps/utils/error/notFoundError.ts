import { WebError } from "./base/base";

export class NotFoundError extends WebError {
  constructor(message: string) {
    super("NotFoundError", 404, message);
  }
}
