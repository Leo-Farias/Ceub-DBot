module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(message, args) {
        console.log("Mensagem:", message)
        console.log("Arguments", args)
		message.channel.send('Pong.')
	},
}