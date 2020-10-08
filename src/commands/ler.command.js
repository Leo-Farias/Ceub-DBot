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

    if (!TopicoController.validarTopico(livro, args[1])) 
        sendEmbed(msg, 'ERROR', 'Campo Faltando', [
            { name:'\u200B', value: '**Não foi possível encontrar esse tópico.\nUtilize o comando `!livro` para ver a lista de tópicos**'}]);
    else {
        let paginaIndex = 1; // ESSE VALOR VIRIA DO BANCO DIZENDO QUAL FOI A ÚLTIMA PÁGINA ACESSADA.
        let paginas = livro[args[1]].pages;
        LivroController.sendPagina(msg, paginas, paginaIndex);
    }
}

module.exports = {
	name: 'ler',
	description: 'Mostrar Página do tópico selecionado.',
	execute: lerPagina
}