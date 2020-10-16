const { MessageAttachment } = require('discord.js');

const sendPagina = (msg, paginas, paginaIndex) => {
    const file = new MessageAttachment('./src/assets/page.png');
    msg.channel.send({ embed: paginas[paginaIndex - 1], files: [file] }).then( message => {
        message.react('◀️');
        message.react('▶️');
    
        const filter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === msg.author.id;
    
        const msgReaction = message.createReactionCollector(filter, { time: 600000 });
    
        msgReaction.on('collect', (r, user) => {
    
            if (r.emoji.name === '▶️' && paginaIndex < paginas.length) paginaIndex++;
            else if (r.emoji.name === '◀️' && paginaIndex !== 1) paginaIndex--;
            
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
            userReactions.forEach(reaction => reaction.users.remove(user.id));

            message.edit({ embed: paginas[paginaIndex - 1] });
        })
    });
}
module.exports = { sendPagina };