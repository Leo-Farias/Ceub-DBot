module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(msg) {
		console.log(msg.author)
        //console.log("Mensagem:", msg)
		return msg.channel.send('Pong.')
	},
}