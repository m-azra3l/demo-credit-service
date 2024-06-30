/**
 * @swagger
 * components:
 *   schemas:
 *     AccountDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id of the user
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         accountNumber:
 *           type: string
 *           description: Account number of the user
 *           example: "1234567890"
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: "john.doe@example.com"
 *         balance:
 *           type: number
 *           format: double
 *           description: Balance of the user's wallet
 *           example: 1000.50
 *         loan:
 *           type: number
 *           format: double
 *           description: Loan owed by the user
 *           example: 200.00
 *         available:
 *           type: number
 *           format: double
 *           description: Available balance of the user's wallet
 *           example: 800.50
 */
// Data Transfer Object (DTO) class for user account
export class AccountDto {
    public id: number              // Id of the user
    public name: string;           // Name of the user
    public accountNumber: string;  // Account number of the user
    public email: string;          // Email of the user
    public balance: number;        // Balance of the user's wallet
    public loan: number;           // Loan owed by the user
    public available: number       // Available balance of the user's wallet

    // Constructor to initialize the AccountDto object
    constructor(
        id: number,
        name: string,
        accountNumber: string,
        email: string,
        balance: number,
        loan: number,        
        available: number
    ) {
        this.id = id;                       // Set the id property
        this.name = name;                   // Set the name property
        this.accountNumber = accountNumber; // Set the accountNumber property
        this.email = email;                 // Set the email property
        this.balance = balance;             // Set the balance property
        this.loan = loan;                   // Set the loan property
        this.available = available          // Set the available property
    }
}