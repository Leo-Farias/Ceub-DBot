
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_perguntas_quizz (
        id_relacao int(11) NOT NULL AUTO_INCREMENT,
        fk_id_quizz int(11) NOT NULL,
        fk_id_atividade int(11) NOT NULL,
        PRIMARY KEY (id_relacao),
        KEY tb_perguntas_quizz_FK (fk_id_quizz),
        KEY tb_perguntas_quizz_FK_1 (fk_id_atividade),
        CONSTRAINT tb_perguntas_quizz_FK FOREIGN KEY (fk_id_quizz) REFERENCES tb_quizz (id_quizz),
        CONSTRAINT tb_perguntas_quizz_FK_1 FOREIGN KEY (fk_id_atividade) REFERENCES tb_atividade (id_atividade)
      ); 
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_perguntas_quizz;
    `)
};
