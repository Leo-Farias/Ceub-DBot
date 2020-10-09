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
const sendLivro = (msg, livro) => {
    let livroEmbed = {
        color: '0xf0ff00',
        author: {
            name: "Livro de Estudos Python"
        },
        description: "Livro para estudar os conceitos de programação da linguagem Python. \n\n Comandos: \n !ler introducao \n !ler var \n !ler dados \n !ler func",
        timestamp: new Date()
    };
    let nomeTopicos = [];
    let situacoesPag = [];
    for ( let topico in livro ) {
        // Pegando nome do tópico e adicionando ao final do livro
        nomeTopicos.splice(nomeTopicos.length, 0, livro[topico].nome);

        let paginaAtual = 0; // OBTER ESSA VALOR DO BANCO
        let maximoPaginas = livro[topico]["page_max"];
        situacoesPag.splice(nomeTopicos.length, 0, `${paginaAtual}/${maximoPaginas} (${(paginaAtual/maximoPaginas) * 100})%`);
    }
    livroEmbed.fields = [
        { name: nomeTopicos.join('\n'), value: '\u200B', inline: true },
        { name: situacoesPag.join('\n'), value: '\u200B', inline: true }
    ]
    msg.channel.send({ embed: livroEmbed });
}

module.exports = { sendLivro, sendPagina };