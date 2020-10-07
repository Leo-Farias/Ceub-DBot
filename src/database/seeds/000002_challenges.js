const testCase = [
  { entrada: [4,5]}
]

exports.seed = function(knex) {
  return knex('discord_dev.tb_desafios')
    .insert({
      titulo_desafio: 'Desafio de Teste',
      descricao_desafio: 'teste',
      nivel: 1
  })
    .then((result) => {
      //knex.
      result[0]
    })
}