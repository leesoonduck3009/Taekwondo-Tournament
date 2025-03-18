import { validate, ValidationError } from "class-validator";
import { InvalidModelException } from "../exceptions/InvalidModelException";

export function CheckValidation() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (const arg of args) {
        if (typeof arg === "object") {
          const errors: ValidationError[] = await validate(arg);
          if (errors.length > 0) {
            throw new InvalidModelException(
              `🚫 Validation failed: ${JSON.stringify(errors)}`
            );
          }
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
