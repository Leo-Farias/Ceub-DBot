const QuizzController = require('../controllers/quizz.controller.js');
const PREFIX = process.env.PREFIX;
const TopicoController = require('../controllers/topico.controller.js');
const DificuldadeController = require('../controllers/dificuldade.controller.js');
const commandParser = require('../utils/commandParser')

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
	description: 'Iniciar o quizz.',
	execute: executarQuizz
};