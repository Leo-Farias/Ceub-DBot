const knex = require('../connection')
const { getDifficulty } = require('./difficulty.dao')

/*
console.log(msg.author)
User {
  id: 'xxxxxxxxxxxxxxxxxxxxxx',
  username: 'User Name',
  bot: false,
  discriminator: 'XYZW',
  avatar: 'ghasd76fgsa79d6gas67fdg685as', //HEX?
  lastMessageID: 'xxxxxxxxxxxxxxxxxxxxxxx',
  lastMessageChannelID: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  flags: UserFlags { bitfield: 0 }
}
*/



async function getPlayerInfo(msg, destroy = true){
    const id_pessoa = msg.author.id
    const pessoa = await knex.select('*')
        .from('tb_pessoa')
        .where({ id_pessoa })
        .then((result) => {
            return result
        })
    return pessoa
}

async function setNewPlayer(msg){
    const pessoa = await getPlayerInfo(msg, false)
    if(pessoa.length > 0){
        return pessoa[0]
    } else {
        const id_pessoa = msg.author.id
        const novo_usuario = knex('tb_pessoa').insert(
            {
                id_pessoa: id_pessoa,
                pontuacao_desafio: 0,
                pontuacao_duelo: 0,
                xp: 0
            }
        )
        .then(result => {
            return result
        })
        .catch(err => console.log(err))
        return novo_usuario
    }
}

//const euzinho = { author: { id: '242443950047100927' } }
//setNewPlayer(euzinho)
//setNewPlayer(euzinho).then(res => console.log(res))
//getPlayerInfo(euzinho).then(res => console.log(res))
//console.log(getPlayerInfo(euzinho))
module.exports = {
    getPlayerInfo,
    setNewPlayer
}