import { BaseException } from "./BaseException";

export class ConflictException extends BaseException {
  constructor(message: string) {
    super(409, message);
  }
}
