const livro = require('../assets/livro.json');

const sendLivro = (msg) => {
    let livroEmbed = {
        color: '0xf0ff00',
        author: {
            name: "Livro de Estudos Python"
        },
        description: "Livro para estudar os conceitos de programação da linguagem Python.",
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




module.exports = {
	name: 'livro',
	description: 'Mostra o livro aos usuarios',
	execute: sendLivro
}