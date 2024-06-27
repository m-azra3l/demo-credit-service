// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a Wallet interface extending the Base Entity interface
export interface WalletInterface extends BaseEntity {
    accountNumber: string // Account number associated with the wallet
    balance: number; // Current balance of the wallet
    userId: number; // ID of the user who owns the wallet
  }