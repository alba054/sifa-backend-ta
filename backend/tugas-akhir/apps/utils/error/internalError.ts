import { WebError } from "./base/base";

export class InternalServerError extends WebError {
  constructor(message: string) {
    super("InternalServerError", 500, message);
  }
}
