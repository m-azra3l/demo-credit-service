// Import the serverless-http library to handle serverless deployment
import serverless from 'serverless-http';

// Import the App class to initialize the application
import App from './app';

// Import the validateEnv function to validate environment variables
import validateEnv from './utils/validateEnv';

// Import the route classes to define the application routes
import HealthRoute from './routes/health.route';
import AuthRoute from './routes/auth.route';
import TransactionRoute from './routes/transaction.route';

// Validate environment variables to ensure required variables are set
validateEnv();

// Initialize the application with the defined routes
const app = new App([
    new HealthRoute(),       // Health check route
    new AuthRoute(),         // Authentication route
    new TransactionRoute()   // Transaction-related routes
]);

// Export the serverless handler to handle requests in a serverless environment
export const handler = serverless(app.listen());