import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("transactions").del();

    // Define transactions with sourceTransactionId and destinationTransactionId
    const transactions = [
        {
            sourceTransactionId: 1,
            destinationTransactionId: 2,
            deleted: false
        },
        {
            sourceTransactionId: 2,
            destinationTransactionId: 3,
            deleted: false
        },
        {
            sourceTransactionId: 3,
            destinationTransactionId: 1,
            deleted: false
        }
    ];

    // Inserts seed entries 
    await knex('transactions').insert(transactions);
};
