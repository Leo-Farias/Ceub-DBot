exports.up = function(knex) {
  return knex.schema.raw(`
    CREATE TABLE bot_config (
        prefix varchar(1) NOT NULL
    )
    ENGINE=InnoDB;
  `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE bot_config;
    `)
};
