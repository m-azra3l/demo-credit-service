import { 
    NextFunction, 
    Request, 
    Response 
} from 'express';
import { HttpError } from '../errors/HttpError';

// Middleware function to handle errors
const errorMiddleware = (
    error: HttpError, // The error object
    req: Request,     // The Express request object
    res: Response,    // The Express response object
    next: NextFunction // The next middleware function in the stack
) => {
  try {
    // Extract the status code from the error object, default to 500 if not present
    const statusCode: number = error.statusCode || 500;

    // Extract the error message from the error object, default to a generic message if not present
    const message: string = error.message || 'Someone did something bad in the server! \n I am sorry';

    // Send the error response with the appropriate status code and message
    res.status(statusCode).json({ 
        success: error.success, // Include the success flag from the error object
        message // Include the error message
    });
  } catch (error) {
    // If an error occurs while handling the error, pass it to the next middleware
    next(error);
  }
};

export default errorMiddleware;