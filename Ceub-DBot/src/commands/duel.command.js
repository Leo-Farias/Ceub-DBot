const commandParser = require('../utils/commandParser')
const runTest = require('../utils/code/testRunner')
const codeExtractor = require('../utils/code/codeExtractor')
const logInfo = require('../utils/log/logCommandInfo')
const { sendEmbed } = require('../utils/default-embeder')

const PREFIX = process.env.PREFIX;

function duelPlayer(msg) {
    const userCommand = commandParser(msg)
    try {
        target = msg.mentions.users.first().id;
    } catch (e) {
        return sendEmbed(msg, 'ALERT', 'ERROR 404: Menção não encontrada.', 
        [{ name:'\u200B', value: `Não foi possível encontrar outro jogador para o desafio, lembre de mencionar o usuário com @nome_do_jogador.\n**Exemplo**: \`${PREFIX}duelo @nome_do_jogador 1000 quizz variavel \`` }]);
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