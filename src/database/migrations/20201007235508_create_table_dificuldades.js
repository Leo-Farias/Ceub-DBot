
exports.up = function(knex) {
    return knex.schema.raw(`
    CREATE TABLE tb_dificuldades (
        id_dificuldade INT auto_increment NOT NULL,
        name varchar(30) NOT NULL,
        min INT NOT NULL,
        max INT NOT NULL,
        CONSTRAINT tb_dificuldades_PK PRIMARY KEY (id_dificuldade)
    );
    `)
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_dificuldades')
};
