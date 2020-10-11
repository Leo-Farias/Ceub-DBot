const PREFIX = process.env.PREFIX;

function ajuda(msg, bot){
	let manualEmbed = {
        color: 0x33ffe3,
        author: {
            name: '📚  Manual de Uso do LeFiF  📚',
		},
		fields: []
	};
	
	bot.commands.forEach( command => {
		manualEmbed.fields.push({ name: command.description.title, value: command.description.content });
		manualEmbed.fields.push({ name: '\u200B', value: '\u200B' });
	});
	manualEmbed.fields.pop();

	msg.channel.send({ embed: manualEmbed }); 
}

module.exports = {
	name: 'ajuda',
	description: {
		title: `⚙️  ${PREFIX}ajuda  ⚙️`,
		content: 'Comando para exibir manual de uso do LeFiF. '
	},
	execute: ajuda
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