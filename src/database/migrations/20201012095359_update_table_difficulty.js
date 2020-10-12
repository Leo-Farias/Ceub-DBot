
exports.up = function(knex) {
    return knex.raw(`
        ALTER TABLE tb_dificuldades ADD CONSTRAINT tb_dificuldades_UN UNIQUE KEY (name);
    `)
};

exports.down = function(knex) {
    return knex.raw(`
        ALTER TABLE discord_dev.tb_dificuldades DROP KEY tb_dificuldades_UN;
    `)
};
