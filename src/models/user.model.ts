// Import necessary modules from Objection.js
import { Model, ModelObject, Pojo } from 'objection';

// Import the UserInterface for type checking
import { UserInterface } from '../interfaces/user.inteface';

// Define the User model class, extending Objection's Model class and implementing UserInterface
export class User extends Model implements UserInterface {
  id!: number;         // User ID
  name!: string;       // User name
  email!: string;      // User email
  password!: string;   // User password
  createdAt!: Date;    // Timestamp for when the user was created
  updatedAt!: Date;    // Timestamp for when the user was last updated
  deleted!: boolean;   // Boolean flag indicating if the user is deleted

  // Define the table name for the model
  static tableName = 'users';

  // Define the primary key column for the table
  static idColumn = 'id';

  // Format the JSON response, removing sensitive information (e.g., password)
  $formatJson(json: Pojo) {
    json = super.$formatJson(json); // Call the base class's $formatJson method
    delete json.password;           // Remove the password property from the JSON object
    return json;                    // Return the modified JSON object
  }
}

// Define a type alias for the ModelObject<User> to use elsewhere in the codebase
export type UserShape = ModelObject<User>;
