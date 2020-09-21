const perguntas = require('../assets/perguntas.json');
const { shuffle } = require('../utils/array-handler.js');

/**
 * Embaralhar e receber perguntas do banco de dados.
 * TODO: É possível adicionar uma filtragem através do id da pergunta para evitar
 * perguntas repitidas.
 * @return {Array} retorna array de perguntas {Object}.
*/
const obterPerguntas = () => {
    let perguntasIds = Object.keys(perguntas);
    let todasPerguntas = [];
    shuffle(perguntasIds);

    for (let i = 0; i < perguntasIds.length; i++) todasPerguntas.push(perguntas[perguntasIds[i]]);
    
    return todasPerguntas;
}

const handlePergunta = (pergunta, INDEX_PERGUNTA) => {
    let { label, alternativas, alternativaCorreta } = pergunta;
    const INDEX_ALTERNATIVA = [':regional_indicator_a: - ', ':regional_indicator_b: - ', ':regional_indicator_c: - ', ':regional_indicator_d: - '];
    
    // Embaralhando alternativas.
    shuffle(alternativas);

    // Adicionando apenas 3.
    alternativas = alternativas.filter( (alt, index) => index < 3 );
    
    // Inserindo alternativa correta em uma posição aleatória. Usamos 3 pois contamos com o 0.
    const ALT_CORRETA_POS = Math.round(Math.random() * 3);
    alternativas.splice(ALT_CORRETA_POS, 0, alternativaCorreta);

    // Montando pergunta embed.
    const perguntaEmbed = {
        color: 0x45f542,
        title: `Questão ${INDEX_PERGUNTA} de 4:`,
        fields: [
            { name: `${INDEX_PERGUNTA}. ${label}`, value: "**Alternativas** \n" + alternativas.map( (alt, index) => `${INDEX_ALTERNATIVA[index]}${alt}`).join("\n") }
        ],
        timestamp: new Date(),
    };

    return [perguntaEmbed, ALT_CORRETA_POS];
}

const handleQuizz = (msg, perguntas, alternativas, pContador, bot) => {

    let [embed, alt_correta] = handlePergunta(perguntas[0], pContador+1);
    msg.channel.send({ embed }).then( message => {
        alternativas.forEach(alt => message.react(alt));

        const filter = (reaction, user) => 
        alternativas.includes(reaction.emoji.name) && user.id === msg.author.id;

        const msgReaction = message.createReactionCollector(filter, { time: 15000 });

        msgReaction.on('collect', r => {
            if(r.emoji.name === alternativas[alt_correta]) {
                msg.channel.send('Você conseguiu!');
                msgReaction.stop();
            }
            else{
                msg.channel.send('Tente novamente!');
            } 
        })
        msgReaction.on('end', collected => {
            // removendo 1° item  da lista de perguntas.
            perguntas.splice(0, 1);
            
            // Se não tiver próxima pergunta então quizz foi finalizado.
            if (!perguntas[0] || collected.size === 0) {
                
                collected.size === 0
                ? message.channel.send('⏲️ Quizz Finalizado por **inatividade**. ⏲️')
                : message.channel.send('Quizz Finalizado.');

                bot.quizz[msg.guild.id] = false; // Setando quizz como false possibilitando o início de outro quizz.
            }
            else
                handleQuizz(msg, perguntas, alternativas, ++pContador, bot);
            
        });
    });
}

module.exports = { obterPerguntas, handlePergunta, handleQuizz };