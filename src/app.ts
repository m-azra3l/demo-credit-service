// Import necessary modules from 'express' and other libraries
import express from 'express';
import helmet from 'helmet';
import { Model } from 'objection';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

// Import custom logging stream
import { stream } from './utils/logger';

// Import environment variables
import {
    NODE_ENV,
    API_PORT,
    LOG_FORMAT
} from './config/envConfig';

// Import database connection
import db from './data';

// Import route interface for typing
import { Routes } from './interfaces/route.interface';

// Import error handling middleware
import errorMiddleware from './middlewares/error.middleware';

// Define the App class to initialize the application
class App {
    public app: express.Application; // Express application instance
    public env: string; // Environment (development, production, etc.)
    public port: string | number; // Port number for the server

    // Constructor to initialize the application with the given routes
    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = API_PORT || 5000;

        this.initializeDatabase(); // Initialize the database connection
        this.initializeMiddlewares(); // Initialize middlewares
        this.initializeRoutes(routes); // Initialize routes
        this.initializeErrorHandling(); // Initialize error handling
    };

    // Method to start listening for requests
    public listen() {
        return this.app;
    };

    // Method to get the Express application instance
    public getApp() {
        return this.app;
    };

    // Private method to initialize the database connection
    private initializeDatabase() {
        // Set the database connection for Objection.js models
        Model.knex(db);
    };

    // Private method to initialize middlewares
    private initializeMiddlewares() {
        // Use morgan middleware for logging HTTP requests in the specified format
        this.app.use(morgan(LOG_FORMAT || 'combined', { stream }));

        // Use cors middleware for enabling CORS with various options
        this.app.use(cors({ origin: '*', credentials: true }));

        // Use hpp middleware to protect against HTTP Parameter Pollution attacks
        this.app.use(hpp());

        // Use helmet middleware to set various HTTP headers for security
        this.app.use(helmet());

        // Use compression middleware to compress response bodies
        this.app.use(compression());

        // Use express.json middleware to parse JSON payloads
        this.app.use(express.json());

        // Use express.urlencoded middleware to parse URL-encoded payloads
        this.app.use(express.urlencoded({ extended: true }));
    };

    // Private method to initialize routes
    private initializeRoutes(routes: Routes[]) {
        // Iterate over the routes and use them in the application
        routes.forEach(route => {
            this.app.use('/', route.router);
        });

        // Handle 404 errors for unknown routes
        this.app.use((req, res) => res.status(404).send({ status: 'error', message: `${req.method} ${req.originalUrl} Not Found` }));
    };

    // Private method to initialize error handling middleware
    private initializeErrorHandling() {
        // Use custom error handling middleware
        this.app.use(errorMiddleware);
    };
}

// Export the App class as the default export
export default App;