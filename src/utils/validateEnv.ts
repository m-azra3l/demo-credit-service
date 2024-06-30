// Import necessary functions and types from 'envalid'
import { cleanEnv, port, str } from 'envalid';

// Function to validate environment variables
const validateEnv = () => {
    // Validate the environment variables using cleanEnv
    // This will check if the specified environment variables are present and valid
    cleanEnv(process.env, {
        NODE_ENV: str(),     // NODE_ENV should be a string
        API_PORT: port(),    // API_PORT should be a port number
    });
};

// Export the validateEnv function as the default export
export default validateEnv;