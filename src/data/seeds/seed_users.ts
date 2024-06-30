import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    // Define users with plain text passwords
  const users = [
    { 
      name: 'John Doe', 
      account_number: '0123456789', 
      email: 'john.doe@example.com', 
      password: 'P@ssword1' 
    },
    { 
      name: 'Jane Doe', 
      account_number: '1234567890', 
      email: 'jane.doe@example.com', 
      password: 'P@ssword1' 
    },
    { 
      name: 'Jim Beam', 
      account_number: '2345678901', 
      email: 'jim.beam@example.com', 
      password: 'P@ssword1' 
    }
  ];

  // Encrypt passwords
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
    // Inserts seed entries
    await knex("users").insert(users);
};
