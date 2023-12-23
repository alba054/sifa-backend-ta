import { Router } from "express";
import { TestHandler } from "./TestHandler";

export class TestRouter {
  private testHandler: TestHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/tests";
    this.router = Router();
    this.testHandler = new TestHandler();
  }

  register() {
    this.router.post(this.path, this.testHandler.postMessage);

    return this.router;
  }
}
