// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a Wallet interface extending the Base Entity interface
export interface WalletInterface extends BaseEntity {
    balance: number;      // Current balance of the wallet
    loan: number;         // Current owed amount of the wallet
    userId: number;       // ID of the user who owns the wallet
  }