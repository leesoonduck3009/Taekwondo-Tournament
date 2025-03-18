import { BaseException } from "./BaseException";

export class UnauthorizeException extends BaseException {
  constructor(message: string) {
    super(401, message);
  }
}
