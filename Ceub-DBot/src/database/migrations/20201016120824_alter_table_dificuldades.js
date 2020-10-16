
exports.up = function(knex) {
    return knex.raw(`
        ALTER TABLE tb_dificuldades ADD CONSTRAINT tb_dificuldades_FK FOREIGN KEY (\`min\`) REFERENCES tb_nivel(\`nivel\`);
    `).then(() => {
        return knex.raw(`
           ALTER TABLE tb_dificuldades ADD CONSTRAINT tb_dificuldades_FK_1 FOREIGN KEY (\`max\`) REFERENCES tb_nivel(\`nivel\`);
        `)
    })
};

exports.down = function(knex) {
    return knex.raw(`
        ALTER TABLE tb_dificuldades DROP FOREIGN KEY tb_dificuldades_FK;
    `).then(() => {
        return knex.raw(`
            ALTER TABLE tb_dificuldades DROP FOREIGN KEY tb_dificuldades_FK_1;
        `)
    })
};
