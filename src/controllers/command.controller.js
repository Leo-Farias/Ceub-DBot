const contentParser = require('../utils/command-parser')
const runCode = require('../utils/code-runner')

function runCommand(msg){
    const userCommand = contentParser(msg.content)
    console.log(`INFOS:
    USUARIO: ${msg.author.username}
    USER_ID: ${msg.author.id}
    MENSAGEM_ID: ${msg.id}
    CONTEUDO: ${msg.content}
    ESTRUTURA_COMANDO: ${contentParser(msg.content, 'List')}
    `)
    
    runCode(userCommand.parameter)
        .then((result) => {
            console.log("Result:", result)
            return msg.channel.send(result)
        })
        .catch((e) => {
            console.log(e)
            return msg.channel.send("Erro inesperado")
        })
}




module.exports = { runCommand }