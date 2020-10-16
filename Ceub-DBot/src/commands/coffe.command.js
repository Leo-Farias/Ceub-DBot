const { sendEmbed } = require('../utils/default-embeder')
const PREFIX = process.env.PREFIX;

function coffe(msg){
    return sendEmbed(msg, 'ERROR', "ERRO 418: I'm a teapot", [
        { name:'\u200B', value: `Hyper Text Coffee Pot Control Protocol nao suportado` }
    ])
}

module.exports = {
	name: 'coffe',
	description: {
		title: `☕  ${PREFIX}coffe  ☕`,
		content: 'Comando para exibir mensagem divertida sobre Hyper Text Coffee Pot Control Protocol.'
	},
	execute: coffe
}