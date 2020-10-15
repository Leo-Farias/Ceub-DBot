const LivroController = require('../controllers/livro.controller');
const TopicoController = require('../controllers/topico.controller.js');
const livro = require('../assets/livro.json');
const { sendEmbed } = require('../utils/default-embeder');
const PREFIX = process.env.PREFIX;

const lerPagina = (msg) => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    if (!args[1]) {
        sendEmbed(msg, 'ERROR', 'Campo Faltando', [
            { name:'\u200B', value: '**Você precisa informar o campo de leitura.\n`!ler {topico}`**'}]);
        return
    }
    // OBTENDO VALOR CORRETO PARA O LIVRO A PARTIR DE OUTROS NOMES
    // Exemplo: var = variavel ou variável ou var;
    let topico = TopicoController.obterSmartTopico(args[1]);

    if (!TopicoController.validarTopico(livro, topico)) 
        sendEmbed(msg, 'ERROR', 'Campo Faltando', [
            { name:'\u200B', value: `Não foi possível encontrar o tópico \`${topico}\`.\n**Utilize o comando \`!livro\` para ver a lista de tópicos**`}]);
    else {
        let paginaIndex = 1; // ESSE VALOR VIRIA DO BANCO DIZENDO QUAL FOI A ÚLTIMA PÁGINA ACESSADA.
        let paginas = livro[topico].pages;
        LivroController.sendPagina(msg, paginas, paginaIndex);
    }
}

module.exports = {
	name: 'ler',
	description: {
		title: `:book:  ${PREFIX}ler {topico}  :book:`,
		content: `Acessa o livro e exibe uma ou mais páginas sobre o tópico inserido, para navegar entre as páginas basta clicar nos símbolos ◀️ ▶️ que estarão localizados abaixo da mensagem.\n\n**Exemplo**: \`${PREFIX}ler variavel\``
	},
	execute: lerPagina
}