exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE tb_pergunta_tipo (
            id_tipo int(11) NOT NULL,
            nome_tipo varchar(100) NOT NULL,
            CONSTRAINT tb_pergunta_tipo_pk PRIMARY KEY (id_tipo)
        ) ENGINE=InnoDB;
    `)
  };
  
  exports.down = function(knex) {
      return knex.schema.raw(`
          DROP TABLE tb_pergunta_tipo;
      `)
  };
  