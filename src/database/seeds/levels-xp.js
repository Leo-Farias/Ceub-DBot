
exports.seed = function(knex) {
  levelXpList = []
  let xp = 500
  for(let i = 1; i <= 100; i++){
      console.log(`LVL: ${i}, XP: ${xp}`)
      levelXpList.push({nivel: i, nivel_xp: xp})
      xp = xp * 1.05
  }
  return knex('tb_nivel').insert(levelXpList)
}
