
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_quizz (
        id_quizz int(11) NOT NULL AUTO_INCREMENT,
        fk_id_solicitante varchar(18) COLLATE latin1_bin NOT NULL,
        start_time datetime NOT NULL,
        end_time datetime DEFAULT NULL,
        PRIMARY KEY (id_quizz),
        KEY tb_quizz_FK (fk_id_solicitante),
        CONSTRAINT tb_quizz_FK FOREIGN KEY (fk_id_solicitante) REFERENCES tb_pessoa (id_pessoa)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_quizz;
    `)
};
