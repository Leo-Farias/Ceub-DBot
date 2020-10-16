const commandParser = require('../utils/commandParser');
const DuelController = require('../controllers/duel.controller');
const { isPositiveInt } = require('../utils/number-validator');
const { sendEmbed } = require('../utils/default-embeder');

const PREFIX = process.env.PREFIX;

function duelPlayer(msg, bot) {
    let { commands: userCommand } = commandParser(msg);
    let target = null;
    try {
        target = msg.mentions.users.first().id;
    } catch (e) {
        return sendEmbed(msg, 'ALERT', 'ERROR 404: MENÇÃO NÃO ENCONTRADA.', 
        [{ name:'\u200B', value: `Não foi possível encontrar outro jogador para o desafio, lembre de mencionar o usuário com @nome_do_jogador.\n**Exemplo**: \`${PREFIX}duelo @nome_do_jogador 1000 quizz variavel \`` }]);
    }

    if (target === msg.author.id) return sendEmbed(msg, 'ERROR', 'ERROR 417: Menção inválida.', 
        [{ name:'\u200B', value: `Você não pode desafiar à si mesmo ou um bot. \n**Exemplo**: \`${PREFIX}duelo @nome_do_jogador 1000 quizz variavel \`` }]);

    let pontos = userCommand[2];
    if (!isPositiveInt(pontos)) return sendEmbed(msg, 'ERROR', 'ERROR 417: VALOR DE PONTOS INVÁLIDO.', 
        [{ name:'\u200B', value: `O valor ${pontos} não é um valor inteiro positivo válido. \n**Exemplo**: \`${PREFIX}duelo @nome_do_jogador 1000 quizz variavel \`` }]);
    else pontos = parseInt(pontos);
    
    let atividade = userCommand[3];
    if (atividade !== 'desafio' &&  atividade !== 'quizz') return sendEmbed(msg, 'ALERT', 'ERROR 404: ATIVIDADE FORNECIDA NÃO ENCONTRADA.', 
        [{ name:'\u200B', value: `A atividade '${atividade? atividade : ' '}' não é um valor válido para duelo, as atividades aceitas são: **desafio** e **quizz**. \n**Exemplo**: \`${PREFIX}duelo @nome_do_jogador 1000 quizz variavel \`` }]);
    else {
        let outrosValores = userCommand.filter((_, index) => index > 3);
        let command = bot.commands.get(atividade);
        DuelController.aceitarDuelo(msg, bot, target, command, outrosValores);
    }
    
}

module.exports = {
	name: 'duelo',
	description: {
		title: `:boxing_glove:  ${PREFIX}duelo {@usuário} {pontos} {quizz ou desafio} {topico(opcional)}  :boxing_glove: `,
		content: `Começa um duelo em uma das atividades (quizz ou desafio) apostando X pontos, o ganhador do duelo ganha essa quantia de pontos do outro participante.\n\n**Exemplo**: \`${PREFIX}duelo @participante 1000 quizz variavel \`\n`
	},
	execute: duelPlayer
}