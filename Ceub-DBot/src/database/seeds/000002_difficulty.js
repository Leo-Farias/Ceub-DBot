exports.seed = function(knex) {
    console.log("[SEED]: Populating tb_dificuldades")
    const dificuldades = require('../JSON/difficulty.json')
    return knex('tb_dificuldades').insert(dificuldades)
}