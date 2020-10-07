exports.up = async function(knex) {
    return await knex.schema.raw(`
        ALTER TABLE discord_dev.tb_nivel ADD xp_desafio INT NOT NULL;
    `)
}

exports.down = async function(knex) {
    return await knex.schema.raw(`
        ALTER TABLE discord_dev.tb_nivel DROP COLUMN xp_desafio;
    `)
}