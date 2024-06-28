// Import necessary modules and interfaces
import { Request } from 'express'; // Import the Request type from Express
import { UserInterface } from './user.interface'; // Import the UserInterface

// Interface for the data contained in the JWT payload
export interface JWTData {
    id: number;   // User ID
    name: string; // User name
    email: string // User email
}

// Interface for the token data returned from the JWT creation function
export interface TokenData {
    token: string; // JWT token string
}

// Interface that extends the Express Request object to include user data
export interface RequestWithUser extends Request {
    user: UserInterface; // User data attached to the request
}