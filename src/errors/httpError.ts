export class HttpError extends Error {
    public message: string;    // Error message to be displayed
    public status: string;   // Success flag indicating the operation failed
    public statusCode: number; // HTTP status code associated with the error
  
    // Constructor to initialize the error object
    constructor(message: string, statusCode: number) {
        super(message);         // Call the parent class (Error) constructor
        this.message = message; // Set the error message
        this.status = 'error';   // Set the status flag to error, indicating failure
        this.statusCode = statusCode; // Set the HTTP status code
    }
}