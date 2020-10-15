const commandParser = require('../utils/commandParser')
const runTest = require('../utils/code/testRunner')
const codeExtractor = require('../utils/code/codeExtractor')
const logInfo = require('../utils/log/logCommandInfo')
const { sendEmbed } = require('../utils/default-embeder')

/*
&desafio submit
```
def soma(numeros):
  assert numeros[0] + numeros[1]
```
*/
function submit(msg){
    const code = codeExtractor(msg)
    if( !code ) return
    runTest(code, 'pytest')
    .then((result) => {
        //return msg.channel.send("Entregar desafio")
        return msg.channel.send(`OUTPUT: \n\`\`\`\n${result}\n\`\`\``)
    })
    .catch((e) => {
        console.log(e)
        return msg.channel.send(e)
    })
}



const PREFIX = process.env.PREFIX;

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
            return submit(msg)
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
	description: {
		title: `:boxing_glove:  ${PREFIX}duelo {@usuário} {pontos} {quizz ou desafio} {topico(opcional)}  :boxing_glove: `,
		content: `Começa um duelo em uma das atividades (quizz ou desafio) apostando X pontos, o ganhador do duelo ganha essa quantia de pontos do outro participante.\n\n**Exemplo**: \`${PREFIX}duelo @participante 1000 quizz variavel \`\n`
	},
	execute: challenge
}