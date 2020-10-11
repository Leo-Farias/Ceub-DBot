const PREFIX = process.env.PREFIX;

module.exports = {
	name: 'ping',
	description: {
		title: `🏓  ${PREFIX}ping  🏓`,
		content: 'Comando para mandar um ping no servidor (utilizado para testar se o bot está funcionando). '
	},
	execute(message, args) {
        console.log("Mensagem:", message)
        console.log("Arguments", args)
		message.channel.send('Pong.')
	},
}
