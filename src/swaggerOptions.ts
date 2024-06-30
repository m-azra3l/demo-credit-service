import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Lending application backend service',
            version: '1.0.0',
            description: 'API documentation for Lending application backend service'
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1',
                description: 'Development server'
            },
            {
                url: 'https://michael-adesina-lendsqr-be-test.onrender.com/api/v1',
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['src/dtos/*.ts', 'src/interfaces/*.ts', 'src/controllers/*.ts'], // Paths to files with documentation
};

export default swaggerOptions;