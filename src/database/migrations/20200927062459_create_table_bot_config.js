const schema = process.env.DB_SCHEMA
exports.up = function(knex) {
  return knex.schema.createTable('bot_config', (table) => {
    table.string('prefix', 1)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bot_config')
};
