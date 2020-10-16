
exports.up = async function(knex) {
    await knex.raw(`
        ALTER TABLE tb_desafios DROP FOREIGN KEY tb_desafio_FK;
    `)
    await knex.raw(`
        ALTER TABLE tb_desafios DROP COLUMN nivel;
    `)
    await knex.raw(`
        ALTER TABLE tb_desafios ADD id_dificuldade INT NOT NULL;
    `)
    return knex.raw(`
        ALTER TABLE tb_desafios ADD CONSTRAINT tb_desafios_FK FOREIGN KEY (id_dificuldade) REFERENCES tb_dificuldades(id_dificuldade);
    `)
};

exports.down = async function(knex) {
    await knex.raw(`
    SET FOREIGN_KEY_CHECKS = 0;
    `)
    await knex.raw(`
        TRUNCATE TABLE tb_desafios;
    `)
    await knex.raw(`
        SET FOREIGN_KEY_CHECKS = 1;
    `)
    await knex.raw(`
        ALTER TABLE tb_desafios DROP FOREIGN KEY tb_desafios_FK;
    `)
    await knex.raw(`
        ALTER TABLE tb_desafios DROP COLUMN id_dificuldade;
    `)
    await knex.raw(`   
        ALTER TABLE tb_desafios ADD nivel INT NOT NULL;
    `)
    return knex.raw(`
        ALTER TABLE tb_desafios ADD CONSTRAINT tb_desafios_FK FOREIGN KEY (nivel) REFERENCES tb_nivel(nivel);
    `)
};
