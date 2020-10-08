
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_progresso_livros (
        id_progresso int(11) NOT NULL AUTO_INCREMENT,
        fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
        id_livro int(11) NOT NULL,
        pagina_atual int(11) NOT NULL,
        PRIMARY KEY (id_progresso),
        KEY tb_progresso_livrso_FK (fk_id_pessoa),
        CONSTRAINT tb_progresso_livrso_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa)
      );
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_progresso_livros;
    `)
};
