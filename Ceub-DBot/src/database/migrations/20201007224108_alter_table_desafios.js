
exports.up = function(knex) {
    return knex.schema.raw(`ALTER TABLE discord_dev.tb_desafios ADD testes_json json NOT NULL;`)
};

exports.down = function(knex) {
    return knex.schema.raw(`ALTER TABLE discord_dev.tb_desafios DROP COLUMN testes_json;`)
};
