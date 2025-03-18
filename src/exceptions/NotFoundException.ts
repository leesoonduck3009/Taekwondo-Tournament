import { BaseException } from "./BaseException";

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundException";
  }
}
