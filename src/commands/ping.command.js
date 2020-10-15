module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(msg) {
		console.log("PING INFO", msg)
		return msg.channel.send('Pong.')
	},
}