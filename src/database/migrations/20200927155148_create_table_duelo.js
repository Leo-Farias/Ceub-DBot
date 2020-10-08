
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_duelo (
        id_duelo int(11) NOT NULL AUTO_INCREMENT,
        start_time datetime NOT NULL,
        fk_id_desafiante varchar(18) COLLATE latin1_bin NOT NULL,
        fk_id_desafiado varchar(18) COLLATE latin1_bin NOT NULL,
        end_time datetime DEFAULT NULL,
        fk_atividade int(11) NOT NULL,
        PRIMARY KEY (id_duelo),
        KEY tb_duelo_FK (fk_id_desafiado),
        KEY tb_duelo_FK_1 (fk_id_desafiante),
        KEY tb_duelo_FK_2 (fk_atividade),
        CONSTRAINT tb_duelo_FK FOREIGN KEY (fk_id_desafiado) REFERENCES tb_pessoa (id_pessoa),
        CONSTRAINT tb_duelo_FK_1 FOREIGN KEY (fk_id_desafiante) REFERENCES tb_pessoa (id_pessoa),
        CONSTRAINT tb_duelo_FK_2 FOREIGN KEY (fk_atividade) REFERENCES tb_atividade (id_atividade)
      );  
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_duelo;
    `)
};
