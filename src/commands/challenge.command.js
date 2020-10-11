
const PREFIX = process.env.PREFIX;

function challenge(msg) {
    msg.channel.send("Desafio!")
}

module.exports = {
	name: 'desafio',
	description: {
		title: `:boxing_glove:  ${PREFIX}duelo {@usuário} {pontos} {quizz ou desafio} {topico(opcional)}  :boxing_glove: `,
		content: `Começa um duelo em uma das atividades (quizz ou desafio) apostando X pontos, o ganhador do duelo ganha essa quantia de pontos do outro participante.\n\n**Exemplo**: \`${PREFIX}duelo @participante 1000 quizz variavel \`\n`
	},
	execute: challenge
}