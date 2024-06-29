// Import the necessary modules and types from 'express'
import { Router } from 'express';

// Import the Routes interface for type definition
import { Routes } from '../interfaces/route.interface';

// Import the HealthController to handle health check requests
import HealthController from '../controllers/health.controller';

// Define the HealthRoute class to set up health check routes
class HealthRoute implements Routes {
    public path = '/'; // Base path for health routes
    public router = Router(); // Express Router instance
    public healthController = new HealthController(); // Instance of HealthController to handle requests

    constructor() {
        this.initializeRoutes(); // Initialize the routes when an instance is created
    };

    // Private method to initialize the routes
    private initializeRoutes() {
        // Route to check the health of the application
        this.router.get(`${this.path}`, this.healthController.health); // Handle GET request at the base path with health method

        // Another route to check the health of the application
        this.router.get(`${this.path}health`, this.healthController.health); // Handle GET request at '/health' with health method
    };
};

// Export the HealthRoute class to be used in other parts of the application
export default HealthRoute;
