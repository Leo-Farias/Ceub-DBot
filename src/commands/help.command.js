function help(msg, bot){
	let helpMessage = '-=-=-= Menu =-=-=- (REFAZER)\n'
	bot.commands.forEach((command) => {
		helpMessage += `${command.name}: ${command.description}\n`
	})
	return msg.channel.send(helpMessage) 
}

module.exports = {
	name: 'help',
	description: 'Auxilio Emergencial',
	execute: help
}
/*
	{
		name: 'ajuda',
		description: 'Ping!',
		execute: help	
	},
	{
		name: 'sos',
		description: 'Ping!',
		execute: help	
	},
	{
		name: 'socorro',
		description: 'Ping!',
		execute: help	
    }
*/