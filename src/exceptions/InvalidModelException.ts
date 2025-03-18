import { BaseException } from "./BaseException";

export class InvalidModelException extends BaseException {
  constructor(message: string) {
    super(400, message);
    this.name = "InvalidModelException";
  }
}
