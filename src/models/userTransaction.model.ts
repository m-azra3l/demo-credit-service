// Import necessary modules from Objection.js
import { Model, ModelObject, Pojo } from 'objection';

// Import the UserTransactionInterface for type checking
import { UserTransactionInterface } from '../interfaces/userTransaction.interface';

// Import the Transaction model for defining relationships
import { Transaction } from './transaction.model';

// Import the User model for defining relationships
import { User } from './user.model';

// Define the UserTransaction model class, extending Objection's Model class and implementing UserTransactionInterface
export class UserTransaction extends Model implements UserTransactionInterface {
  id!: number;          // UserTransaction ID
  amount!: number;      // Transaction amount
  userId!: number;      // ID of the user associated with the transaction
  type!: string;        // Type of transaction (e.g., credit, debit)
  status!: string;      // Status of the transaction (e.g., pending, completed)
  direction!: string;   // Direction of the transaction (e.g., inbound, outbound)
  createdAt!: Date;     // Timestamp for when the transaction was created
  updatedAt!: Date;     // Timestamp for when the transaction was last updated
  deleted!: boolean;    // Boolean flag indicating if the transaction is deleted

  // Define the table name for the model
  static tableName = 'user_transactions';

  // Define the primary key column for the table
  static idColumn = 'id';

  // Define the relation mappings for the UserTransaction model
  static get relationMappings() {
    return {
      transactionSource: {
        relation: Model.HasOneRelation, // Define a one-to-one relation with the Transaction model
        modelClass: Transaction,        // Specify the related model class
        join: {
          from: 'user_transactions.id',         // Key in the UserTransaction model
          to: 'transactions.sourceTransactionId', // Key in the Transaction model for the source transaction
        },
      },
      transactionDestination: {
        relation: Model.HasOneRelation, // Define a one-to-one relation with the Transaction model
        modelClass: Transaction,        // Specify the related model class
        join: {
          from: 'user_transactions.id',            // Key in the UserTransaction model
          to: 'transactions.destinationTransactionId', // Key in the Transaction model for the destination transaction
        },
      },
      user: {
        relation: Model.HasOneRelation, // Define a one-to-one relation with the User model
        modelClass: User,               // Specify the related model class
        join: {
          from: 'user_transactions.userId', // Key in the UserTransaction model
          to: 'users.id',                   // Key in the User model
        },
      },
    };
  }

  // Format the JSON response, customizing the output
  $formatJson(json: Pojo) {
    json = super.$formatJson(json); // Call the base class's $formatJson method
    if (json?.transactionSource?.destination?.user) {
      json.destination = json.transactionSource.destination.user; // Add destination user info if available
    }
    if (json?.transactionDestination?.source?.user) {
      json.source = json.transactionDestination.source.user; // Add source user info if available
    }
    delete json.transactionSource;    // Remove the transactionSource property from the JSON object
    delete json.transactionDestination; // Remove the transactionDestination property from the JSON object
    return json;                      // Return the modified JSON object
  }
}

// Define a type alias for the ModelObject<UserTransaction> to use elsewhere in the codebase
export type UserTransactionShape = ModelObject<UserTransaction>;

