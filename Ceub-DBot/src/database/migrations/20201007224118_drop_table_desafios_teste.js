
exports.up = function(knex) {
  return knex.schema.raw(`DROP TABLE tb_desafio_testes;`)
};

exports.down = function(knex) {
    return knex.schema.raw(`
    CREATE TABLE tb_desafio_testes (
        id_teste int(11) NOT NULL AUTO_INCREMENT,
        fk_id_desafio int(11) NOT NULL,
        entrada varchar(100) COLLATE latin1_bin NOT NULL,
        saida varchar(100) COLLATE latin1_bin NOT NULL,
        PRIMARY KEY (id_teste),
        KEY tb_desafio_testes_FK (fk_id_desafio),
        CONSTRAINT tb_desafio_testes_FK FOREIGN KEY (fk_id_desafio) REFERENCES tb_desafios (id_desafio)
    );
    `)
};
