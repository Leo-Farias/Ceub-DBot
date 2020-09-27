
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_perguntas (
        id_pergunta int(11) NOT NULL AUTO_INCREMENT,
        pergunta text NOT NULL,
        resposta varchar(100) NOT NULL,
        alternativas_falsas text NOT NULL,
        tempo int(11) NOT NULL,
        pontuacao int(11) NOT NULL,
        fk_id_tipo int(11) NOT NULL,
        fk_nivel int(11) NOT NULL,
        PRIMARY KEY (id_pergunta),
        CONSTRAINT tb_perguntas_FK FOREIGN KEY (fk_id_tipo) REFERENCES tb_pergunta_tipo (id_tipo),
        CONSTRAINT tb_perguntas_FK_1 FOREIGN KEY (fk_nivel) REFERENCES tb_nivel (nivel)
      ) ENGINE=InnoDB;
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_perguntas;
    `)
};
