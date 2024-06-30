import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_transactions").del();
// Define user transactions with required fields
const transactions = [
    {
      amount: 100.00,
      userId: 1,
      type: 'fund',
      status: 'pending',
      direction: 'credit'
    },
    {
      amount: 200.00,
      userId: 2,
      type: 'transfer',
      status: 'success',
      direction: 'debit'
    },
    {
      amount: 300.00,
      userId: 3,
      type: 'withdraw',
      status: 'failed',
      direction: 'debit'
    }
  ];

  // Inserts seed entries 
  await knex('user_transactions').insert(transactions);
};
