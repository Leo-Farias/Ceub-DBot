
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_pergunta_pessoa (
        id_relacao int(11) NOT NULL AUTO_INCREMENT,
        fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
        fk_id_pergunta int(11) NOT NULL,
        PRIMARY KEY (id_relacao),
        KEY tb_pergunta_pessoa_FK (fk_id_pessoa),
        KEY tb_pergunta_pessoa_FK_1 (fk_id_pergunta),
        CONSTRAINT tb_pergunta_pessoa_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa),
        CONSTRAINT tb_pergunta_pessoa_FK_1 FOREIGN KEY (fk_id_pergunta) REFERENCES tb_perguntas (id_pergunta)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_pergunta_pessoa;
    `)
};
