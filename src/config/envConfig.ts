// Import the 'config' function from the 'dotenv' package to load environment variables from a .env file
// import { config } from 'dotenv';
// Load the environment variables from a .env file based on the current NODE_ENV (defaults to 'development')
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

require('dotenv').config();

// Destructure and export the necessary environment variables from 'process.env'
export const {
    ADJUTOR_APP_ID,        // Application ID for the Adjutor service
    ADJUTOR_BASE_URL,      // Base URL for the Adjutor service
    ADJUTOR_SECRET_KEY,    // Secret key for authenticating with the Adjutor service
    API_PORT,              // Port number for the API server
    AUTH_SECRET,           // Secret key for authentication
    DATABASE_HOST,         // Host address of the database server
    DATABASE_NAME,         // Name of the database
    DATABASE_PASSWORD,     // Password for the database user
    DATABASE_PORT,         // Port number on which the database server is listening
    DATABASE_USERNAME,     // Username for the database
    NODE_ENV,              // Current environment (development, staging, or production)
    SALT_ROUNDS,                  // Number of salt rounds to use for hashing passwords
    TOKEN_EXPIRATION       // Expiration time of created jwt
} = process.env;
