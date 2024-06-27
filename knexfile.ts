// Import necessary database configuration variables from envConfig
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME
} from './src/config/envConfig';

// Import the Knex type definitions
import { Knex } from 'knex';

// Base configuration object with common settings
const baseConfig: Knex.Config = {
    client: 'mysql2', // Specify the database client to use (MySQL in this case)
        useNullAsDefault: true, // Use NULL as the default value for unspecified fields
    connection: {
        charset: 'utf8', // Set the character set for the database connection
        timezone: '+01:00', // Set the timezone for the database connection
        host: DATABASE_HOST, // Database host address
        port: Number(DATABASE_PORT), // Database port number
        user: DATABASE_USERNAME, // Database username
        password: DATABASE_PASSWORD, // Database password
        database: DATABASE_NAME // Database name
    },
    pool: {
        min: 2, // Minimum number of connections in the pool
        max: 10, // Maximum number of connections in the pool
    }, 
    migrations: {
        directory: 'src/data/migrations', // Directory for migration files
        tableName: 'migrations', // Table to track migration status
    }  
};

// Define the configuration object for Knex, specifying different environments
const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        ...baseConfig,
        seeds: {
            directory: 'src/data/seeds', // Directory for seed files
        },
    },
    staging: {
        ...baseConfig
    },
    production:{
        ...baseConfig
    }
};

// Export the Knex configuration object
export default knexConfig;
