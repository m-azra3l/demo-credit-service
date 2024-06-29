// Import the plainToInstance function from class-transformer to convert plain objects to class instances
import { plainToInstance } from 'class-transformer';

// Import the validate function and ValidationError class from class-validator for validating class instances
import { validate, ValidationError } from 'class-validator';

// Import the RequestHandler type from express for typing the middleware function
import { RequestHandler } from 'express';

// Import the custom HttpError class for handling and throwing HTTP errors
import { HttpError } from '../errors/httpError';


// Middleware for validating request data
const validationMiddleware = (
  type: any, // The class type to which the request data will be transformed
  value: 'body' | 'query' | 'params' = 'body', // The part of the request to validate
  skipMissingProperties = false, // Whether to skip validation of missing properties
  whitelist = true, // Whether to remove properties not present in the whitelist
  forbidNonWhitelisted = true // Whether to forbid properties not present in the whitelist
): RequestHandler => {
  return (req, res, next) => {
    // Transform and validate the request data
    validate(plainToInstance(type, req[value]), { 
        skipMissingProperties, 
        whitelist,
        forbidNonWhitelisted 
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        // Collect error messages from validation errors
        const message = errors
          .map((error: ValidationError) => {
            // Handle cases where constraints might be undefined
            return error.constraints ? Object.values(error.constraints).join(', ') : '';
          })
          .join(', ');

        // Pass the error to the next middleware
        next(new HttpError(message, 400));
      } else {
        // Proceed to the next middleware
        next();
      }
    });
  };
};

// Export the validationMiddleWare as the default export
export default validationMiddleware;