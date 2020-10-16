const nivelGenerator = require('../../utils/nivelGenerator')
exports.seed = function(knex) {
  levelXpList = nivelGenerator()
  console.log("[SEED]: Populating tb_nivel")
  return knex('tb_nivel').insert(levelXpList)
}
