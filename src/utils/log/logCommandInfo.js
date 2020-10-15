const commandParser = require('../commandParser')

const logInfo = (msg) => {
    console.log(`INFOS:
    USUARIO: ${msg.author.username}
    USER_ID: ${msg.author.id}
    MENSAGEM_ID: ${msg.id}
    CONTEUDO: ${msg.content}
    ESTRUTURA_COMANDO: ${commandParser(msg, 'List')}
    `)
}


module.exports = logInfo