// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a User interface extending the Base Entity interface
export interface UserInterface extends BaseEntity {
    name: string;           // Name of the user
    accountNumber: string   // Account number associated with the user
    email: string;          // Email address of the user
    password: string;       // Password for the user's account
  }