const commandParser = require('../utils/commandParser')
const runCode = require('../utils/codeRunner')
const codeExtractor = require('../utils/codeExtractor')

logInfo = (msg) => {
    console.log(`INFOS:
    USUARIO: ${msg.author.username}
    USER_ID: ${msg.author.id}
    MENSAGEM_ID: ${msg.id}
    CONTEUDO: ${msg.content}
    ESTRUTURA_COMANDO: ${commandParser(msg.content, 'List')}
    `)
}

function runCommand(msg){
    const userCommand = commandParser(msg.content)
    logInfo(msg)
    console.log(userCommand.parameter)

    const code = codeExtractor(msg)
    runCode(code)
        .then((result) => {
            console.log("Result:", result)
            return msg.channel.send(`OUTPUT: \n\`\`\`\n${result}\n\`\`\``)
        })
        .catch((e) => {
            console.log(e)
            return msg.channel.send(e)
        })
}







module.exports = {
    name: 'code',
	description: 'Run Code from Discord text',
	execute: runCommand
}