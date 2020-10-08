exports.seed = function(knex) {
    const dificuldades = require('../JSON/dificulty.json')
    return knex('tb_dificuldades').insert(dificuldades)
}