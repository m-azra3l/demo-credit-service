/**
 * @swagger
 * components:
 *   schemas:
 *     TokenData:
 *       type: object       
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *         expiresIn:
 *           type: string
 *           description: JWT token expiration date and time
 */
// Import necessary modules and interfaces
import { Request } from 'express'; // Import the Request type from Express
import { UserInterface } from './user.interface'; // Import the UserInterface

// Interface for the data contained in the JWT payload
export interface JWTData {
    id: number;             // User ID
    name: string;           // User name
    accountNumber: string   // User account number
    email: string           // User email
}

// Interface for the token data returned from the JWT creation function
export interface TokenData {
    token: string; // JWT token string
}

// Interface that extends the Express Request object to include user data
export interface RequestWithUser extends Request {
    user?: UserInterface; // User data attached to the request
}