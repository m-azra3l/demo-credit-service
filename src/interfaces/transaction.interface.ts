// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a Transaction interface extending the Base Entity interface
export interface TransactionInterface extends BaseEntity {
    sourceTransactionId: number;        // ID of the source transaction
    destinationTransactionId: number;   // ID of the destination transaction
}