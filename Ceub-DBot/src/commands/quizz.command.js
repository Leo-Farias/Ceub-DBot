const QuizzController = require('../controllers/quizz.controller.js');
const PREFIX = process.env.PREFIX;
const TopicoController = require('../controllers/topico.controller.js');
const DificuldadeController = require('../controllers/dificuldade.controller.js');

const executarQuizz = (msg, bot) => {
    if(!bot.quizz[msg.channel.id]) {
        let pContador = 0;
        let [ALTERNATIVAS, perguntas] = QuizzController.obterInfoQuizz(msg, bot, msg.content.substring(PREFIX.length).split(" "), TopicoController, DificuldadeController, 10);
        if (ALTERNATIVAS || perguntas) QuizzController.handleQuizz(msg, bot, perguntas, perguntas.length, ALTERNATIVAS, pContador);
    }
    else 
        msg.channel.send(`Já existe um quizz ocorrendo neste momento.`);
}

module.exports = {
	name: 'quizz',
	description: {
		title: `📝  ${PREFIX}quizz {topico(opcional, vários)}  📝`,
        content: 'Inicia um quizz com perguntas baseadas no tópico (se fornecido) e no nível do jogador. ' + 
        'As perguntas são divididas em:\n -\`Dificuldade\`\n-\`Topico\`\n-\`Pontuação\`\n-\`Tempo de Execução\`\n' +
        `Todas as perguntas são de múltipla escolha, **só é considerada a primeira escolha selecionada**. \n\n**Exemplo**: \`${PREFIX}quizz variavel função objeto\``
	},
	execute: executarQuizz
};