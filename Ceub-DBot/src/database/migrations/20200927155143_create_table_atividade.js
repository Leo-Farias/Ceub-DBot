
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_atividade (
        id_atividade int(11) NOT NULL AUTO_INCREMENT,
        fk_id_desafio int(11) DEFAULT NULL,
        fk_id_pergunta int(11) DEFAULT NULL,
        datetime datetime NOT NULL,
        PRIMARY KEY (id_atividade),
        KEY tb_atividade_FK (fk_id_pergunta),
        KEY tb_atividade_FK_1 (fk_id_desafio),
        CONSTRAINT tb_atividade_FK FOREIGN KEY (fk_id_pergunta) REFERENCES tb_perguntas (id_pergunta),
        CONSTRAINT tb_atividade_FK_1 FOREIGN KEY (fk_id_desafio) REFERENCES tb_desafios (id_desafio)
      );
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_atividade;
    `)
};
