export class HttpError extends Error {
    public message: string;    // Error message to be displayed
    public statusCode: number; // HTTP status code associated with the error
    public success: boolean;   // Success flag indicating the operation failed
  
    // Constructor to initialize the error object
    constructor(message: string, statusCode: number) {
        super(message);         // Call the parent class (Error) constructor
        this.message = message; // Set the error message
        this.success = false;   // Set the success flag to false, indicating failure
        this.statusCode = statusCode; // Set the HTTP status code
    }
}