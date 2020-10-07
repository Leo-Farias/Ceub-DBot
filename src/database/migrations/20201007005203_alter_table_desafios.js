
exports.up = async function(knex) {
    return await knex.schema.raw(`
    ALTER TABLE discord_dev.tb_desafios DROP COLUMN pontuacao;
    `)
}

exports.down = async function(knex) {
    return await knex.schema.raw(`ALTER TABLE discord_dev.tb_desafios ADD pontuacao INT NOT NULL;`)
}