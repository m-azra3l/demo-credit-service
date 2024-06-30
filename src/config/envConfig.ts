// Import the 'config' function from the 'dotenv' package to load environment variables from a .env file
//import { config } from 'dotenv';
//import path from 'path';

// Determine which .env file to load based on NODE_ENV(defaults to 'development')
//const envPath = path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`);
//config({ path: envPath });

 require('dotenv').config();

// Destructure and export the necessary environment variables from 'process.env'
export const {
    ADJUTOR_BASE_URL,      // Base URL for the Adjutor service
    ADJUTOR_SECRET_KEY,    // Secret key for authenticating with the Adjutor service
    API_PORT,              // Port number for the API server
    AUTH_SECRET,           // Secret key for authentication
    DATABASE_HOST,         // Host address of the database server
    DATABASE_NAME,         // Name of the database
    DATABASE_PASSWORD,     // Password for the database user
    DATABASE_PORT,         // Port number on which the database server is listening
    DATABASE_USERNAME,     // Username for the database
    LOG_FORMAT,            // Custom log format
    NODE_ENV,              // Current environment (development, staging, or production)
    SALT_ROUNDS,           // Number of salt rounds to use for hashing passwords
    TOKEN_EXPIRATION       // Expiration time of created jwt
} = process.env;
