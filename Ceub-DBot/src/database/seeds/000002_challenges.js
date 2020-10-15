const fs = require('fs')
//ALTER TABLE discord_dev.tb_desafios ADD testes_json json NOT NULL;



exports.seed = function(knex) {
  const testFiles = fs.readdirSync('./src/challenges').filter(file => file.endsWith('.challenge.json'));
  var challenges = []
  for (const file of testFiles) {
      console.log("Importing challenge:", file)
      let fileContent = require('../../challenges/' + file)
      let {
        titulo_desafio,
        descricao_desafio,
        nivel
      } = fileContent
      let testes_json = JSON.stringify(fileContent.testes)
      challenges.push({ titulo_desafio, descricao_desafio, nivel, testes_json })
  }
  return knex('discord_dev.tb_desafios')
    .insert(challenges)
}