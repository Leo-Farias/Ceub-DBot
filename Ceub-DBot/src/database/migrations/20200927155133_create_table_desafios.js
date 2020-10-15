
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_desafios (
        id_desafio int(11) NOT NULL AUTO_INCREMENT,
        titulo_desafio varchar(100) NOT NULL,
        descricao_desafio text NOT NULL,
        codigos_resposta text NOT NULL,
        nivel int(11) NOT NULL,
        pontuacao int(11) NOT NULL,
        PRIMARY KEY (id_desafio),
        KEY tb_desafio_FK (nivel),
        CONSTRAINT tb_desafio_FK FOREIGN KEY (nivel) REFERENCES tb_nivel (nivel)
      );
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_desafios;
    `)
};
