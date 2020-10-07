
exports.up = async function(knex) {
    await knex.schema.raw(`
        ALTER TABLE discord_dev.tb_desafios DROP COLUMN codigos_resposta;
    `)
    return knex.schema.raw(`
        CREATE TABLE discord_dev.tb_codigos_resposta (
            id_resposta INT auto_increment NOT NULL,
            codigo_resposta TEXT NOT NULL,
            fk_id_desafio INT NULL,
            CONSTRAINT tb_codigos_resposta_PK PRIMARY KEY (id_resposta),
            CONSTRAINT tb_codigos_resposta_FK FOREIGN KEY (fk_id_desafio) REFERENCES discord_dev.tb_desafios(id_desafio)
        );
    `)
};

exports.down = async function(knex) {
    await knex.schema.raw(`
        ALTER TABLE discord_dev.tb_desafios ADD codigos_resposta TEXT NOT NULL;
    `)
    return knex.schema.dropTable('discord_dev.tb_codigos_resposta')
};
