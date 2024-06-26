import {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME
} from './src/config/envConfig';

import { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        useNullAsDefault: true,
        connection: {
            charset: 'utf8',
            timezone: '+01:00',
            host: DATABASE_HOST,
            port: Number(DATABASE_PORT),
            user: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        }
    }
};

export default knexConfig;
