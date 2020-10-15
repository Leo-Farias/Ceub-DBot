const { sendEmbed } = require('../utils/default-embeder')

function coffe(msg){
    return sendEmbed(msg, 'ERROR', "ERRO 418: I'm a teapot", [
        { name:'\u200B', value: `Hyper Text Coffee Pot Control Protocol nao suportado` }
    ])
}

module.exports = {
	name: 'coffe',
	description: "I'm a teapot",
	execute: coffe
}