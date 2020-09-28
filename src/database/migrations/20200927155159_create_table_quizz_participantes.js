
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_quizz_participantes (
        id_participacao int(11) NOT NULL AUTO_INCREMENT,
        fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
        fk_id_quizz int(11) NOT NULL,
        PRIMARY KEY (id_participacao),
        KEY tb_quizz_participantes_FK (fk_id_pessoa),
        KEY tb_quizz_participantes_FK_1 (fk_id_quizz),
        CONSTRAINT tb_quizz_participantes_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa),
        CONSTRAINT tb_quizz_participantes_FK_1 FOREIGN KEY (fk_id_quizz) REFERENCES tb_quizz (id_quizz)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_quizz_participantes;
    `)
};
