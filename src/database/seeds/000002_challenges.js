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
  console.log(challenges)
  return knex('discord_dev.tb_desafios')
    .insert(challenges)
  /*
    .then((result) => {
      const testCase = desafio.testes
      let testeObjArray = []
      testCase.forEach((teste) => {
        let entradaString = ''
        teste['entrada'].forEach((elemento) => {
          entradaString += `${elemento};`
        })
        const testeObj = {
          fk_id_desafio: result[0],
          entrada: entradaString.slice(0, entradaString.length - 1),
          saida: teste['saida']
        }
        testeObjArray.push(testeObj)
      })

      return knex('tb_desafio_testes')
      .insert(testeObjArray)
    })
    */
}