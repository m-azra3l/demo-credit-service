import type { Knex } from "knex";

// Migration to create the 'wallets' table
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wallets', function (table) {
        table.bigIncrements('id').unsigned().primary(); // Define 'id' as an auto-incremented unsigned integer primary key
        table.decimal('balance', 14, 2).notNullable().defaultTo(0); // Define 'balance' column as a non-nullable decimal with default value 0
        table.decimal('loan', 14, 2).notNullable().defaultTo(0); // Define 'loan' column as a non-nullable decimal with default value 0
        table.bigInteger('userId').unsigned().notNullable().references('id').inTable('users'); // Define 'userId' as an unsigned integer, non-nullable, referencing 'id' in 'users' table
        table.string('accountNumber', 10).notNullable().unique(); // Define 'accountNumber' column as a non-nullable unique string with a maximum length of 10 characters
        table.timestamp('createdAt').defaultTo(knex.fn.now()); // Define 'createdAt' column with a default timestamp of the current time
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); // Define 'updatedAt' column with a default timestamp of the current time and auto-update on change
        table.boolean('deleted').defaultTo(false); // Define 'deleted' column as a boolean with a default value of false
    });
}

// Rollback migration for the 'wallets' table
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wallets'); // Drop the 'wallets' table if the migration is rolled back
}

