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







module.exports = {
    name: 'code',
	description: 'Run Code from Discord text',
	execute: runCommand
}