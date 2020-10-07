const nivelGenerator = require('../../utils/nivelGenerator')
exports.seed = function(knex) {
  levelXpList = nivelGenerator()
  return knex('tb_nivel').insert(levelXpList)
}
