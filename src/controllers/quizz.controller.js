const perguntas = require('../assets/perguntas.json');
const { MessageAttachment } = require('discord.js');
const { shuffle } = require('../utils/array-handler.js');
const { sendEmbed } = require('../utils/default-embeder');

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

const handlePergunta = (pergunta, INDEX_PERGUNTA, num_perguntas, tempo) => {
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
        author: {
            name: `Questão ${INDEX_PERGUNTA} de ${num_perguntas}:`,
            icon_url: 'attachment://easy_3.png',
        },
        fields: [
            { name: `${INDEX_PERGUNTA}. ${label}`, value: "\u200B\n**Alternativas** \n\n" + alternativas.map( (alt, index) => `${INDEX_ALTERNATIVA[index]}${alt}`).join("\n\n") }
        ],
        timestamp: new Date(),
        footer: {
            text: `Tempo para responder a pergunta ${tempo/1000} segundos`,
        },
    };

    return [perguntaEmbed, ALT_CORRETA_POS];
}

const handleQuizz = (msg, bot, perguntas, num_perguntas, alternativas, pContador) => {

    const file = new MessageAttachment('./src/assets/easy_3.png'); // TODO PEGAR VALOR A PARTIR DE UM VALOR DA PERGUNTA
    const medalhas = ['🥇', '🥈', '🥉'];
    const tempo_pergunta = perguntas[0].time;
    let [embed, alt_correta] = handlePergunta(perguntas[0], pContador+1, num_perguntas, tempo_pergunta);
    let participantes = [];
    let vencedores = [];

    msg.channel.send({ files: [file], embed }).then( message => {
        alternativas.forEach(alt => message.react(alt)); // Reagindo as alternativas (a, b, c, d).

        const filter = (reaction, user) => // Filtro da coleta.
            alternativas.includes(reaction.emoji.name) && !user.bot && !participantes.includes(user.id); 

        const msgReaction = message.createReactionCollector(filter, { time: tempo_pergunta }); // Se quiser mudar o tempo alterar time

        let cronometro = setTimeout(() => { // Criar cronometro para executar metade do tempo antes da pergunta finalizar.
            sendEmbed(msg, 'ALERT', 'Tempo Acabando', [{name: '\u200B',value: `**Faltam ${Math.round((tempo_pergunta/1000)/2)} segundos.**`}])
        }, tempo_pergunta/2);

        msgReaction.on('collect', (r, { id: idParticipante }) => {

            participantes.push(idParticipante); // Adicionando participante na lista para filtrar

            if(r.emoji.name === alternativas[alt_correta]) {
                vencedores.push(idParticipante);
            }
        })

        msgReaction.on('end', collected => {
            // Limpando cronometro ( já que a pergunta foi respondida não tem razão para mandar o alerta ).
            clearTimeout(cronometro);
            // removendo 1° item  da lista de perguntas.
            perguntas.splice(0, 1);

            
            if (vencedores.length > 0)
                defaultEmbeder.sendEmbed(msg, 'CORRECT', 'Tempo Esgotado', 
                    [{ name:'\u200B', value: 'Vencedores: \n' + vencedores.map( (v, index) => index <= 2 ? `${medalhas[index]} <@${v}>` : `${index + 1}° <@${v}>`).join('\n') }]);
            else
                defaultEmbeder.sendEmbed(msg, 'ERROR', 'Tempo Esgotado', [
                    { name:'\u200B', value: '**Ninguém acertou a pergunta**'}]);

            // Se não tiver próxima pergunta então quizz foi finalizado.
            // Ou se ninguém responder nenhuma alternativa.
            if (!perguntas[0] || collected.size === 0) {
                
                collected.size === 0
                ? defaultEmbeder.sendEmbed(msg, 'ERROR', 'Quizz Finalizado', [
                    { name:'\u200B', value: '⏲️ **Inatividade** ⏲️'}])
                : defaultEmbeder.sendEmbed(msg, 'CORRECT', 'Quizz Finalizado', [
                    { name:'\u200B', value: '✅ Todas as Perguntas foram resolvidas. ✅'}]);

                bot.quizz[msg.channel.id] = false; // Setando quizz como false possibilitando o início de outro quizz.
            }
            else
                handleQuizz(msg, bot, perguntas, num_perguntas, alternativas, ++pContador);
            
        });
    });
}

module.exports = { obterPerguntas, handlePergunta, handleQuizz };