// Data Transfer Object (DTO) class for Wallet
export class WalletDto {
    public name: string;           // Name of the wallet owner
    public email: string;          // Email of the wallet owner
    public accountNumber: string;  // Account number of the wallet
    public balance: number;        // Balance of the wallet

    // Constructor to initialize the WalletDto object
    constructor(
        name: string,
        email: string,
        accountNumber: string,
        balance: number
    ) {
        this.name = name;                  // Set the name property
        this.email = email;                // Set the email property
        this.accountNumber = accountNumber; // Set the accountNumber property
        this.balance = balance;            // Set the balance property
    }
}