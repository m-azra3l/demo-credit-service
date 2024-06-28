// Import validation decorators from 'class-validator'
import {
    IsString,    // Validates that the value is a string
    IsNotEmpty,  // Validates that the value is not empty
    IsNumber,    // Validates that the value is a number
    Min          // Validates that the number value is at least a specified minimum value
} from 'class-validator';

// Data Transfer Object (DTO) class for funding a wallet
export class FundWalletDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    public amount: number; // Amount to fund the wallet with, must be a positive number

    // Constructor to initialize the FundWalletDto object
    constructor(amount: number) {
        this.amount = amount; // Set the amount property
    }
}

// Data Transfer Object (DTO) class for withdrawing from a wallet
export class WithdrawDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(10.0)
    public amount: number; // Amount to withdraw from the wallet, must be a positive number

    // Constructor to initialize the WithdrawDto object
    constructor(amount: number) {
        this.amount = amount; // Set the amount property
    }
}

// Data Transfer Object (DTO) class for transferring funds between accounts
export class TransferDto {
    @IsString()
    @IsNotEmpty()
    public accountNumber: string; // Account number to transfer funds to

    @IsNotEmpty()
    @IsNumber()
    @Min(10.0)
    public amount: number; // Amount to transfer, must be a positive number

    // Constructor to initialize the TransferDto object
    constructor(accountNumber: string, amount: number) {
        this.accountNumber = accountNumber; // Set the accountNumber property
        this.amount = amount;               // Set the amount property
    }
}
