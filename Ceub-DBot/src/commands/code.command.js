const commandParser = require('../utils/commandParser')
const runCode = require('../utils/code/codeRunner')
const codeExtractor = require('../utils/code/codeExtractor')
const logInfo = require('../utils/log/logCommandInfo')

function runCommand(msg){
    logInfo(msg)

    const code = codeExtractor(msg)
    if( !code ) return
    runCode(code)
        .then((result) => {
            return msg.channel.send(`OUTPUT: \n\`\`\`\n${result}\n\`\`\``)
        })
        .catch((e) => {
            console.log(e)
            return msg.channel.send(e)
        })
}






const PREFIX = process.env.PREFIX
module.exports = {
	name: 'code',
	description: {
		title: `:wrench:  ${PREFIX}code run \`\`\` {código} \`\`\`  :wrench: `,
		content: `Permite executar códigos em python, o resultado do código é gerado em outra mensagem se possível.\n\n**Exemplo**: ${PREFIX}code run \n\`\`\` print("hello world") \n\`\`\``
	},
	execute: runCommand
}