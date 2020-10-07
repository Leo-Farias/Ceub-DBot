
function challenge(msg) {
    msg.channel.send("Desafio!")
}

module.exports = {
    name: 'desafio',
	description: 'Resolva os problemas para sabotar os planos de Utopia',
	execute: challenge
}