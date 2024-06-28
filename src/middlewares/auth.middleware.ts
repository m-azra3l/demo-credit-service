// Import necessary modules and types from express, jsonwebtoken, and your application
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWTData, RequestWithUser } from '../interfaces/auth.interface';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { AUTH_SECRET } from '../config/envConfig';
import { HttpError } from '../errors/httpError';

// Middleware to authenticate JWT and attach user to the request
const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        // Extract the Authorization header and get the token
        const authorizationHeader = req.header('Authorization');
        const authorization = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : null;

        // If no token is found, return a 401 Unauthorized error
        if (!authorization) return next(new HttpError('Unauthorized', 401));

        // Check if AUTH_SECRET is defined, otherwise throw an error
        if (!AUTH_SECRET) {
            return next(new HttpError('Server error: missing AUTH_SECRET', 500));
        }
        const authSecret: string = AUTH_SECRET;

        // Verify the JWT and extract the payload
        const payload = (await verify(authorization, authSecret)) as JWTData;
        const userId = payload.id;

        // Fetch the user from the database using the userId from the JWT payload
        const user: UserInterface | undefined = await User.query().findById(userId);

        // If the user is not found, return a 404 Not Found error
        if (!user) return next(new HttpError('Not Found', 404));

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // If an error occurs, return a 500 Server Error
        next(new HttpError('Server error', 500));
    }
};

export default authMiddleware;