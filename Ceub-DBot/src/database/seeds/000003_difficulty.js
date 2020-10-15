exports.seed = function(knex) {
    const dificuldades = require('../JSON/difficulty.json')
    return knex('tb_dificuldades').insert(dificuldades)
}