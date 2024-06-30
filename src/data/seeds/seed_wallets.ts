import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("wallets").del();

    // Define wallets with userId and balance
    const wallets = [
        { userId: 1, balance: 1000.00, loan: 0.00 },
        { userId: 2, balance: 1500.00, loan: 0.00 },
        { userId: 3, balance: 2000.00, loan: 0.00 }
    ];

    // Inserts seed entries 
    await knex('wallets').insert(wallets);
};
