import type { Knex } from "knex";

// Migration to create the 'users' table
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.bigIncrements('id').unsigned().primary(); // Define 'id' as an auto-incremented unsigned big integer primary key
        table.string('name').notNullable(); // Define 'name' column as a non-nullable string
        table.string('email', 50).notNullable().unique(); // Define 'email' column as a non-nullable unique string with a maximum length of 50 characters
        table.string('password', 255).notNullable(); // Define 'password' column as a non-nullable string with a maximum length of 255 characters
        table.timestamp('createdAt').defaultTo(knex.fn.now()); // Define 'createdAt' column with a default timestamp of the current time
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); // Define 'updatedAt' column with a default timestamp of the current time and auto-update on change
        table.boolean('deleted').defaultTo(false); // Define 'deleted' column as a boolean with a default value of false
    });
}

// Rollback migration for the 'users' table
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users'); // Drop the 'users' table if the migration is rolled back
}
