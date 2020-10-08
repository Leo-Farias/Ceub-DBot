
exports.up = function(knex) {
    return knex.schema.raw(`
    CREATE TABLE tb_nivel (
        nivel int(11) NOT NULL,
        nivel_xp int(11) NOT NULL,
        PRIMARY KEY (nivel)
      );
      
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE tb_nivel;
    `)
};
