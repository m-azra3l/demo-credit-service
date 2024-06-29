// Import environment variables and necessary modules
import {
    AUTH_SECRET,     // Secret key for signing the JWT
    TOKEN_EXPIRATION // Token expiration time
} from '../config/envConfig';
import jwt from 'jsonwebtoken'; // JSON Web Token library
import { HttpError } from '../errors/httpError'; // Custom error class
import { 
    JWTData,        // Interface for JWT payload data
    TokenData       // Interface for returned token data
} from '../interfaces/auth.interface';
import { UserInterface } from '../interfaces/user.interface'; // Interface for user data

// Function to create a JWT
export function createJwt(
    user: UserInterface // User data for the JWT payload
): TokenData {
    // Construct the JWT payload from the user data
    const jwtData: JWTData = {
        id: user.id,
        name: user.name,
        accountNumber: user.accountNumber,
        email: user.email
    };

    // Check if AUTH_SECRET is defined, throw an error if not
    if (!AUTH_SECRET) {
        throw new HttpError('Missing AUTH_SECRET environment variable', 500);
    }

    // Check if TOKEN_EXPIRATION is defined, throw an error if not
    if (!TOKEN_EXPIRATION) {
        throw new HttpError("Missing TOKEN_EXPIRATION environment variable", 500);
    }

    // Create and return the signed JWT
    return {
        token: jwt.sign(jwtData, AUTH_SECRET, {
            expiresIn: TOKEN_EXPIRATION // Set the token expiration time
        })
    };
};