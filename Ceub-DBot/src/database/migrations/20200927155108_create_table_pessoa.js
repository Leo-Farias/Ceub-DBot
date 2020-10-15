
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_pessoa (
        id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
        pontuacao_desafio int(11) NOT NULL,
        pontuacao_duelo int(11) NOT NULL,
        xp int(11) NOT NULL,
        PRIMARY KEY (id_pessoa)
      ); 
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_pessoa;
    `)
};
