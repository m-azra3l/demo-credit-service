// Import necessary modules and types from express
import {
    NextFunction, // Type for the next middleware function in the Express pipeline
    Request,      // Type for the Express request object
    Response      // Type for the Express response object
} from 'express';

// Import the AuthRepo class for interacting with authentication-related database operations
import AuthRepo from '../data/repositories/auth.repo';

// Import the UserInterface for typing the user object
import { UserInterface } from '../interfaces/user.interface';

// Import DTOs for sign-up and sign-in
import { SignUpDto, SignInDto } from '../dtos/auth.dto';

class AuthController {
    // Instantiate the AuthRepo to use its methods for authentication operations
    public authRepo = new AuthRepo();

    // Method to handle user sign-up
    public signup = async (
        req: Request,        // Express request object
        res: Response,       // Express response object
        next: NextFunction   // Next middleware function
    ): Promise<void> => {
        try {
            // Extract sign-up data from the request body
            const userData: SignUpDto = req.body;
            // Use AuthRepo to sign up the user and get the new user data
            const newUser: UserInterface = await this.authRepo.signup(userData);
            // Respond with a success message and the new user data
            res.status(201).json({
                status: 'success',
                message: 'Account created successfully',
                data: newUser
            });
        } catch (error) {
            // Pass any errors to the next middleware (error handler)
            next(error);
        }
    };

    // Method to handle user sign-in
    public signin = async (
        req: Request,        // Express request object
        res: Response,       // Express response object
        next: NextFunction   // Next middleware function
    ): Promise<void> => {
        try {
            // Extract sign-in data from the request body
            const userData: SignInDto = req.body;
            // Use AuthRepo to sign in the user and get the token and user data
            const { token, user } = await this.authRepo.signin(userData);
            // Respond with a success message and the token and user data
            res.status(200).json({
                status: 'success',
                message: 'Signin successful',
                data: { token, user }
            });
        } catch (error) {
            // Pass any errors to the next middleware (error handler)
            next(error);
        }
    };
}

export default AuthController;