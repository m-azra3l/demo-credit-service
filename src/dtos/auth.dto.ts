/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Jon Doe
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           example: P@ssword1
 *           minLength: 8
 *     SignInDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           example: P@ssword1
 *           minLength: 8
 */

// Import validation decorators from 'class-validator'
import {
    IsEmail,    // Validates that the value is a valid email address
    IsNotEmpty, // Validates that the value is not empty
    IsString,   // Validates that the value is a string
    MinLength   // Validates that the string value has a minimum length
} from 'class-validator';

// Data Transfer Object (DTO) class for user sign-up
export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    public name: string; // User's name

    @IsNotEmpty()
    @IsEmail()
    public email: string; // User's email

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    public password: string; // User's password with a minimum length of 8 characters

    // Constructor to initialize the SignUpDto object
    constructor(name: string, email: string, password: string) {
        this.name = name;     // Set the name property
        this.email = email;   // Set the email property
        this.password = password; // Set the password property
    }
}

// Data Transfer Object (DTO) class for user sign-in
export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string; // User's email

    @IsNotEmpty()
    @IsString()
    public password: string; // User's password

    // Constructor to initialize the SignInDto object
    constructor(email: string, password: string) {
        this.email = email;   // Set the email property
        this.password = password; // Set the password property
    }
}