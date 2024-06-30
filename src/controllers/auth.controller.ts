/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */
// Import necessary modules and types from express
import {
    NextFunction, // Type for the next middleware function in the Express pipeline
    Request,      // Type for the Express request object
    Response      // Type for the Express response object
} from 'express';

// Import the AuthRepo class for interacting with authentication-related database operations
import AuthRepo from '../data/repositories/auth.repo';

// Import DTOs for sign-up and sign-in
import { SignUpDto, SignInDto } from '../dtos/auth.dto';

class AuthController {
    // Instantiate the AuthRepo to use its methods for authentication operations
    public authRepo = new AuthRepo();

    /**
     * @swagger
     * /auth/sign-up:
     *   post:
     *     summary: Sign up a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SignUpDto'
     *     responses:
     *       201:
     *         description: Successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     *       400:
     *         description: User with email already exists
     *       403:
     *         description: User with email is blacklisted
     *       500:
     *         description: Someone did something bad in the server! I am sorry
     */
    // Method to handle user sign-up
    public signup = async (
        req: Request,        // Express request object
        res: Response,       // Express response object
        next: NextFunction   // Next middleware function
    ): Promise<void> => {
        try {
            // Extract sign-up data from the request body
            const userData: SignUpDto = req.body;

            // Use AuthRepo to sign up the user
            await this.authRepo.signup(userData);

            // Respond with a success message and the new user data
            res.status(201).json({
                status: 'success',
                message: 'Successful'
            });
        } 
        catch (error) {
            // Pass any errors to the next middleware (error handler)
            next(error);
        }
    };

    /**
     * @swagger
     * /auth/sign-in:
     *   post:
     *     summary: Sign in a user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SignInDto'
     *     responses:
     *       200:
     *         description: Successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     *                 data:
     *                   type: object
     *                   properties:
     *                     token:
     *                       $ref: '#/components/schemas/TokenData'
     *                     user:
     *                       $ref: '#/components/schemas/AccountDto'
     *       400:
     *         description: Please provide required information
     *       404:
     *         description: Wallet not found
     *       500:
     *         description: Someone did something bad in the server! I am sorry
     */
    // Method to handle user sign-in
    public signin = async (
        req: Request,        // Express request object
        res: Response,       // Express response object
        next: NextFunction   // Next middleware function
    ): Promise<void> => {
        try {
            // Extract sign-in data from the request body
            const userData: SignInDto = req.body;

            // Use AuthRepo to sign in the user and get the token and user account data
            const { user, token } = await this.authRepo.signin(userData);

            // Respond with a success message and the token and user account data
            res.status(200).json({
                status: 'success',
                message: 'Successful',
                data: { user, token }
            });
        } 
        catch (error) {
            // Pass any errors to the next middleware (error handler)
            next(error);
        }
    };
}

// Export the AuthController class as the default export
export default AuthController;