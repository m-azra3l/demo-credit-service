// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a User Transaction interface extending the Base Entity interface
export interface UserTransactionInterface extends BaseEntity {
    amount: number; // Amount involved in the transaction
    userId: number; // ID of the user who made the transaction
    type: string; // Type of transaction (e.g., credit, debit)
    status: string; // Status of the transaction (e.g., pending, completed)
    direction: string; // Direction of the transaction (e.g., inbound, outbound)
}