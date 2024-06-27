import type { Knex } from "knex";

// Migration to create the 'transactions' table
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', function(table) {
        table.bigIncrements('id').unsigned().primary(); // Define 'id' as an auto-incremented unsigned integer primary key
        table.bigInteger('sourceTransactionId').unsigned().index().references('id').inTable('user_transactions'); // Define 'sourceTransactionId' as an unsigned integer, indexed, referencing 'id' in 'user_transactions' table
        table.bigInteger('destinationTransactionId').unsigned().index().references('id').inTable('user_transactions'); // Define 'destinationTransactionId' as an unsigned integer, indexed, referencing 'id' in 'transactions' table
        table.timestamp('createdAt').defaultTo(knex.fn.now()); // Define 'createdAt' column with a default timestamp of the current time
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); // Define 'updatedAt' column with a default timestamp of the current time and auto-update on change
        table.boolean('deleted').defaultTo(false); // Define 'deleted' column as a boolean with a default value of false
    });
}

// Rollback migration for the 'transactions' table
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions'); // Drop the 'transactions' table if the migration is rolled back
}