const desafio = {
  titulo_desafio: 'Desafio de Somar',
  descricao_desafio: 'Crie uma funcao que permita somar qualquer dois floats ou inteiros',
  nivel: 1,
  testes: [
    { entrada: [4,5], saida: 9},
    { entrada: [4,2], saida: 6},
    { entrada: [42,25], saida: 67},
    { entrada: [0,5], saida: 5},
    { entrada: [99,1], saida: 100},
    { entrada: [9.05,2.3], saida: 11.35},
    { entrada: [5.03,2], saida: 7.03},
    { entrada: [-50,3], saida: -47}
  ]
}

exports.seed = function(knex) {
  return knex('discord_dev.tb_desafios')
    .insert({
      titulo_desafio: desafio['titulo_desafio'],
      descricao_desafio: desafio['descricao_desafio'],
      nivel: desafio['nivel']
  })
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
}