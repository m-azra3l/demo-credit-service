import type { Knex } from "knex";

// Migration to create the 'user_transactions' table
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_transactions', function (table) {
        table.bigIncrements('id').unsigned().primary(); // Define 'id' as an auto-incremented unsigned integer primary key
        table.decimal('amount', 14, 2).notNullable(); // Define 'amount' column as a non-nullable decimal with precision 14 and scale 2
        table.bigInteger('userId').unsigned().index().references('id').inTable('users'); // Define 'userId' as an unsigned integer, indexed, referencing 'id' in 'users' table
        table.enu('type', ['fund', 'transfer', 'withdraw']).notNullable(); // Define 'type' column as an enum with specified values, non-nullable
        table.enu('status', ['pending', 'success', 'failed']).defaultTo('pending'); // Define 'status' column as an enum with specified values, defaulting to 'pending'
        table.enu('direction', ['credit', 'debit']).notNullable(); // Define 'direction' column as an enum with specified values, non-nullable
        table.timestamp('createdAt').defaultTo(knex.fn.now()); // Define 'createdAt' column with a default timestamp of the current time
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); // Define 'updatedAt' column with a default timestamp of the current time and auto-update on change
        table.boolean('deleted').defaultTo(false); // Define 'deleted' column as a boolean with a default value of false
    });
}

// Rollback migration for the 'users_transactions' table
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user_transactions'); // Drop the 'users_transactions' table if the migration is rolled back
}
