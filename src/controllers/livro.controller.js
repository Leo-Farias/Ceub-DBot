const sendPagina = (msg, paginas, paginaIndex) => {
    msg.channel.send({ embed: paginas[paginaIndex - 1] }).then( message => {
        message.react('◀️');
        message.react('▶️');
    
        const filter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === msg.author.id;
    
        const msgReaction = message.createReactionCollector(filter, { time: 600000 });
    
        msgReaction.on('collect', r => {
    
            if (r.emoji.name === '▶️' && paginaIndex < paginas.length) paginaIndex++;
            else if (r.emoji.name === '◀️' && paginaIndex !== 1) paginaIndex--;
    
            message.edit({ embed: paginas[paginaIndex - 1] });
        })
    });
}
module.exports = { sendPagina };