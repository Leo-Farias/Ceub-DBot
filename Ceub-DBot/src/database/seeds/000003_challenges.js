const fs = require('fs')
const { getDifficulty } = require('../DAO/difficulty.dao')



exports.seed = async function(knex) {
  const difficulties = await getDifficulty()
  const testFiles = fs.readdirSync('./src/challenges').filter(file => file.endsWith('.challenge.json'));
  var challenges = []
  for (const file of testFiles) {
      console.log("[SEED]: Importing challenge:", file)
      let fileContent = require('../../challenges/' + file)
      let {
        titulo_desafio,
        descricao_desafio,
        dificuldade
      } = fileContent
      let testes_json = JSON.stringify(fileContent.testes)
      let difficultyMatch = difficulties.find(difficulty => difficulty.name == dificuldade).id_dificuldade
      challenges.push({ titulo_desafio, descricao_desafio, id_dificuldade: difficultyMatch, testes_json })
  }
  return knex('discord_dev.tb_desafios')
    .insert(challenges)
}