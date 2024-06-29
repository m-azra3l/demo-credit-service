import { existsSync, mkdirSync } from 'fs'; // File system module to check for existence and create directories
import { join } from 'path'; // Path module to handle file and directory paths
import winston from 'winston'; // Winston logging library
import winstonDaily from 'winston-daily-rotate-file'; // Winston transport for daily log rotation

// Define the path to the logs directory
const logsDirectoryPath: string = join(__dirname, 'logs');

// Check if the logs directory exists, if not, create it
if (!existsSync(logsDirectoryPath)) {
    mkdirSync(logsDirectoryPath);
}

// Define the log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// Create the logger instance
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss', // Timestamp format
        }),
        logFormat, // Apply the log format
    ),
    transports: [
        // Daily rotate file transport for debug level logs
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: join(logsDirectoryPath, 'debug'), // Directory for debug logs
            filename: `%DATE%.log`,
            maxFiles: 30, // Keep logs for 30 days
            json: false, // Log as plain text
            zippedArchive: true, // Compress old log files
        }),
        // Daily rotate file transport for error level logs
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: join(logsDirectoryPath, 'error'), // Directory for error logs
            filename: `%DATE%.log`,
            maxFiles: 30, // Keep logs for 30 days
            handleExceptions: true, // Handle exceptions
            json: false, // Log as plain text
            zippedArchive: true, // Compress old log files
        }),
    ],
});

// Add a console transport to the logger
logger.add(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.splat(), // Format for string interpolation
            winston.format.colorize() // Colorize the console output
        ),
    }),
);

// Define a stream object for integrating with other libraries that expect a stream
const loggerStream = {
    write: (message: string) => {
        logger.info(message.trim()); // Log the message, trimming any trailing newline
    },
};

// Export the logger and loggerStream as the default export
export { logger, loggerStream };