/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('assignee', function(table){
    table.integer('user_id').alter();
    table.integer('todo_id').alter();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('assignee', function(table){
        table.string('user_id').alter();
        table.string('todo_id').alter();
      })
};
