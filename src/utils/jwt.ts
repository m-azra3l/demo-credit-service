// Import environment variables and necessary modules
import {
    AUTH_SECRET,     // Secret key for signing the JWT
    TOKEN_EXPIRATION // Token expiration time
} from '../config/envConfig';
import jwt from 'jsonwebtoken'; // JSON Web Token library
import { HttpError } from '../errors/HttpError'; // Custom error class

// Function to create a JWT
export function createJwt(
    id: number,     // User ID
    name: string,   // User name
    email: string   // User email
): string {
    // Check if AUTH_SECRET is defined, throw an error if not
    if (!AUTH_SECRET) {
        throw new HttpError('Missing AUTH_SECRET environment variable', 500);
    }

    // Check if TOKEN_EXPIRATION is defined, throw an error if not
    if (!TOKEN_EXPIRATION) {
        throw new HttpError("Missing TOKEN_EXPIRATION environment variable", 500);
    }

    // Create and return the signed JWT
    return jwt.sign({ id, name, email }, AUTH_SECRET, {
        expiresIn: TOKEN_EXPIRATION
    });
};