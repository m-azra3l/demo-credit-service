// Import the 'knex' library to interact with the database
import knex from 'knex';

// Import the Knex configuration object from the knexfile
import knexConfig from '../../knexfile';

// Import the NODE_ENV environment variable
import { NODE_ENV } from '../config/envConfig';

// Select the appropriate configuration based on NODE_ENV
const environment = NODE_ENV || 'development';
const dbConfig = knexConfig[environment];

// Initialize a Knex instance using the selected configuration
const db = knex(dbConfig);

// Export the initialized Knex instance for use in other parts of the application
export default db;
