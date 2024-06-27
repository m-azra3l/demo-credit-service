// Import necessary modules from Objection.js
import { Model, ModelObject } from 'objection';

// Import the TransactionInterface for type checking
import { TransactionInterface } from '../interfaces/transaction.interface';

// Import the UserTransaction model for defining relationships
import { UserTransaction } from './userTransaction.model';

// Define the Transaction model class, extending Objection's Model class and implementing TransactionInterface
export class Transaction extends Model implements TransactionInterface {
  id!: number;                    // Transaction ID
  sourceTransactionId!: number;   // ID of the source transaction
  destinationTransactionId!: number; // ID of the destination transaction
  createdAt!: Date;               // Timestamp for when the transaction was created
  updatedAt!: Date;               // Timestamp for when the transaction was last updated
  deleted!: boolean;              // Boolean flag indicating if the transaction is deleted

  // Define the table name for the model
  static tableName = 'transactions';

  // Define the primary key column for the table
  static idColumn = 'id';

  // Define the relation mappings for the Transaction model
  static get relationMappings() {
    return {
      source: {
        relation: Model.HasOneRelation,  // Define a one-to-one relation with the UserTransaction model
        modelClass: UserTransaction,     // Specify the related model class
        join: {
          from: 'user_transactions.id',             // Key in the UserTransaction model
          to: 'transactions.sourceTransactionId',  // Key in the Transaction model for the source transaction            
        },
      },
      destination: {
        relation: Model.HasOneRelation,  // Define a one-to-one relation with the UserTransaction model
        modelClass: UserTransaction,     // Specify the related model class
        join: {
          from: 'user_transactions.id',                 // Key in the UserTransaction model
          to: 'transactions.destinationTransactionId',  // Key in the Transaction model for the destination transaction                   
        },
      },
    };
  }
}

// Define a type alias for the ModelObject<Transaction> to use elsewhere in the codebase
export type TransactionShape = ModelObject<Transaction>;