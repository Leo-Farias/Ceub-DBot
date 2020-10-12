const livro = require('../assets/livro.json');
const PREFIX = process.env.PREFIX;

const sendLivro = (msg) => {
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




module.exports = {
	name: 'livro',
	description: {
		title: `📕  ${PREFIX}livro  📕`,
		content: `Consulta os arquivos do sistema e traz uma lista dos tópicos para treinamento de agentes e mostra o progresso em cada um deles.\n\n**Exemplo**: \`${PREFIX}livro\``
	},
	execute: sendLivro
}