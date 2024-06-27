// Import necessary modules from Objection.js
import { Model, ModelObject } from 'objection';

// Import the WalletInterface for type checking
import { WalletInterface } from '../interfaces/wallet.interface';

// Import the User model for defining relationships
import { User } from './user.model';

// Define the Wallet model class, extending Objection's Model class and implementing WalletInterface
export class Wallet extends Model implements WalletInterface {
  id!: number;         // Wallet ID
  accountNumber!: string; // Account number associated with the wallet
  balance!: number;    // Current balance of the wallet
  userId!: number;     // ID of the user who owns the wallet
  createdAt!: Date;    // Timestamp for when the wallet was created
  updatedAt!: Date;    // Timestamp for when the wallet was last updated
  deleted!: boolean;   // Boolean flag indicating if the wallet is deleted

  // Define the table name for the model
  static tableName = 'wallets';

  // Define the primary key column for the table
  static idColumn = 'id';

  // Define the relation mappings for the Wallet model
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation, // Define a one-to-one relation with the User model
        modelClass: User,               // Specify the related model class
        join: {
          from: 'wallets.userId',       // Key in the Wallet model
          to: 'users.id',               // Key in the User model
        },
      },
    };
  }
}

// Define a type alias for the ModelObject<Wallet> to use elsewhere in the codebase
export type WalletShape = ModelObject<Wallet>;
