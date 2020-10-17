const { MessageAttachment } = require('discord.js');
const { sendEmbed } = require('../utils/default-embeder');

const aceitarDuelo = (msg, bot, target, command, outrosValores) => {
    let startDuel = false;
    const msgEmbed = {
        color: 0x33ffe3,
        author: {
            name: '🥊  DUELO  🥊',
            icon_url: `attachment://load.png`,
        },
        fields: [
            { name: '\u200B', value: `**<@${msg.author.id}> está chamando <@${target}> para um duelo!**\n\n**Você vai aceitar o duelo?**`}
        ]
    };
    const file = new MessageAttachment('./src/assets/load.png');
    msg.channel.send({ embed: msgEmbed, files: [file] }).then( message => {
        message.react('✅');
        message.react('❌');
    
        const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === target;
    
        const msgReaction = message.createReactionCollector(filter, { time: 30000 });
    
        msgReaction.on('collect', (r, user) => {
            startDuel = r.emoji.name === '✅';
            msgReaction.stop();
        });

        msgReaction.on('end', (r, reason) => {
            if (reason === 'time') sendEmbed(msg, 'ALERT', 'TEMPO ESGOTADO.', 
                [{name: '\u200B', value: 'Tempo para aceitar o duelo esgotado. Utilize o comando novamente para iniciar o duelo.'}]);
            else {
                startDuel === true 
                ? command.execute(msg, bot, true, [msg.author.id, target], outrosValores)
                : sendEmbed(msg, 'ERROR', 'DUELO REJEITADO.', 
                [{name: '\u200B', value: `<@${target}> recusou o duelo.`}]);
            }
        });
    });
}
module.exports = { aceitarDuelo };