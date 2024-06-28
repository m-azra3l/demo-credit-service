// Import the Router from express to create route handlers
import { Router } from 'express';

// Import the AuthController to handle authentication requests
import AuthController from '../controllers/auth.controller';

// Import validation middleware to validate request bodies
import validationMiddleware from '../middlewares/validation.middleware';

// Import DTOs for sign-up and sign-in
import { SignInDto, SignUpDto } from '../dtos/auth.dto';

class AuthRoute {
  // Define the base path for authentication routes
  public path = '/auth/';

  // Create a new Router instance
  public router = Router();

  // Instantiate the AuthController to handle the logic for authentication
  public authController = new AuthController();

  // Constructor to initialize routes
  constructor() {
    this.initializeRoutes();
  }

  // Private method to initialize routes
  private initializeRoutes() {
    // Define the route for user sign-up
    this.router.post(
        `${this.path}sign-up`, 
        validationMiddleware(SignUpDto, 'body'), // Validate request body against SignUpDto
        this.authController.signup // Handle the sign-up logic
    );

    // Define the route for user sign-in
    this.router.post(
        `${this.path}sign-in`, 
        validationMiddleware(SignInDto, 'body'), // Validate request body against SignInDto
        this.authController.signin // Handle the sign-in logic
    );
  }
}

// Export the AuthRoute class to be used in other parts of the application
export default AuthRoute;
