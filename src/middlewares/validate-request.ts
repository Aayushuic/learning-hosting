import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

type ValidationSource = 'body' | 'query' | 'params';

function extractMappedErrors(errors: any[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const error of errors) {
    if (error.constraints) {
      result[error.property] = Object.values(error.constraints);
    }
    if (error.children && error.children.length > 0) {
      const childErrors = extractMappedErrors(error.children);
      for (const [childKey, childMessages] of Object.entries(childErrors)) {
        result[`${error.property}.${childKey}`] = childMessages;
      }
    }
  }
  return result;
}

export function validateRequest<T extends object>(
  dtoClass: new () => T,
  source: ValidationSource = 'body'
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dataToValidate = req[source] || {};

    const output = plainToInstance(dtoClass, dataToValidate);

    const errors = await validate(output, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const mappedErrors = extractMappedErrors(errors);

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: mappedErrors,
      });
      return;
    }

    if (source === 'body') {
      req[source] = output;
    }
    next();
  };
}
