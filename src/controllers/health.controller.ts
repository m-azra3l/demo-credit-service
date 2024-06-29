// Import necessary types from 'express'
import { NextFunction, Request, Response } from 'express';

// Define the HealthController class to handle health check requests
class HealthController {
  // Method to check the health of the application
  public health = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Send a 200 OK status to indicate the application is healthy
      res.status(200).send("<h1>Healthy🎉🎊</h1>");
    } catch (error) {
      // If an error occurs, pass it to the next middleware (error handler)
      next(error);
    }
  };
};

// Export the HealthController class as the default export
export default HealthController;