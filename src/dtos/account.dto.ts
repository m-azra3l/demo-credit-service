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