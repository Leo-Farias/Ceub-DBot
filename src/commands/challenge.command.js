const commandParser = require('../utils/commandParser')
const runCode = require('../utils/code/codeRunner')
const codeExtractor = require('../utils/code/codeExtractor')
const logInfo = require('../utils/log/logCommandInfo')
const { sendEmbed } = require('../utils/default-embeder')

function submit(msg){
    const code = codeExtractor(msg)
    if( !code ) return
    runCode(code, pytest)
    .then((result) => {
        return msg.channel.send("Entregar desafio")
        return msg.channel.send(`OUTPUT: \n\`\`\`\n${result}\n\`\`\``)
    })
    .catch((e) => {
        console.log(e)
        return msg.channel.send(e)
    })
}



function challenge(msg) {
    const userCommand = commandParser(msg)
    logInfo(msg)
    switch (userCommand.commands[1]){
        case undefined:
            return msg.channel.send("Novo desafio")
            break;
        case 'help':
            return msg.channel.send("Menu de ajuda do desafio")
            break;
        case 'submit':
            submit(msg)
            break;
        case 'cancel':
            return msg.channel.send("Cancelar desafio ativo...")
            break;
        default:
            return sendEmbed(msg, 'ALERT', 'ERRO 404: COMANDO NÃO ENCONTRADO.', [
                { name:'\u200B', value: `Não foi possível encontrar o comando \`${userCommand.commands.slice(0,2).join(" ")}\` na base de dados.` }
            ])
            break;
    }
}







module.exports = {
    name: 'desafio',
	description: 'Resolva os problemas para sabotar os planos de Utopia',
	execute: challenge
}