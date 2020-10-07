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
const obterPerguntas = (filtroTopicos, filtroDificuldades, qtd_perguntas = 5) => {
    let todasPerguntas = Object.values(perguntas);
    if (filtroTopicos.length > 0) todasPerguntas = todasPerguntas.filter(pergunta => filtroTopicos.includes(pergunta.topico));
    if (filtroDificuldades.length > 0) todasPerguntas = todasPerguntas.filter(pergunta => filtroDificuldades.includes(pergunta.dificuldade));
    
    if(todasPerguntas.length > 0) {
        shuffle(todasPerguntas);
        return todasPerguntas.filter((_, index) => index < qtd_perguntas);
    } else
        return false;
}

const handlePergunta = (pergunta, INDEX_PERGUNTA, num_perguntas, tempo) => {
    let { label, alternativas, alternativaCorreta, dificuldade } = pergunta;
    const INDEX_ALTERNATIVA = [':regional_indicator_a: - ', ':regional_indicator_b: - ', ':regional_indicator_c: - ', ':regional_indicator_d: - '];
    
    let hexcodeColor = 0x000000;
    if (dificuldade.includes('easy')) hexcodeColor = 0x45f542;
    else if (dificuldade.includes('medium')) hexcodeColor = 0x16C9B0;
    else hexcodeColor = 0xDAA520;

    let file_path = `./src/assets/${dificuldade}.png`;
    const file = new MessageAttachment(file_path);

    // Embaralhando alternativas.
    shuffle(alternativas);

    // Adicionando apenas 3.
    alternativas = alternativas.filter( (alt, index) => index < 3 );
    
    // Inserindo alternativa correta em uma posição aleatória. Usamos 3 pois contamos com o 0.
    const ALT_CORRETA_POS = Math.round(Math.random() * 3);
    alternativas.splice(ALT_CORRETA_POS, 0, alternativaCorreta);
    
    // Montando pergunta embed.
    const perguntaEmbed = {
        color: hexcodeColor,
        author: {
            name: `Questão ${INDEX_PERGUNTA} de ${num_perguntas}:`,
            icon_url: `attachment://${/\w+\.\w*/.exec(file_path)[0]}`,
        },
        fields: [
            { name: `${INDEX_PERGUNTA}. ${label}`, value: "\u200B\n**Alternativas** \n\n" + alternativas.map( (alt, index) => `${INDEX_ALTERNATIVA[index]}${alt}`).join("\n\n") }
        ],
        timestamp: new Date(),
        footer: {
            text: `Tempo para responder a pergunta ${tempo/1000} segundos`,
        },
    };

    return [perguntaEmbed, ALT_CORRETA_POS, file];
}

const handleQuizz = (msg, bot, perguntas, num_perguntas, alternativas, pContador) => {

    const medalhas = ['🥇', '🥈', '🥉'];
    const tempo_pergunta = perguntas[0].time;
    const ponto_total = perguntas[0].pontos;
    let [embed, alt_correta, pergunta_icon] = handlePergunta(perguntas[0], pContador+1, num_perguntas, tempo_pergunta);
    let participantes = [];
    let vencedores = [];

    msg.channel.send({ files: [pergunta_icon], embed }).then( message => {
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
                let pontos = 0;
                switch (vencedores.length) {
                    case 0: // 1° Lugar
                        pontos = ponto_total;
                        break;
                    case 1: // 2° Lugar
                        pontos = Math.round(ponto_total * 0.85);
                        break;
                    case 2: // 3° Lugar
                        pontos = Math.round(ponto_total * 0.75);
                        break;
                    default: // Demais posições
                        pontos = Math.round(ponto_total * 0.65);
                        break;
                }
                vencedores.push({ id: idParticipante, pontos: pontos });
            }
        })

        msgReaction.on('end', collected => {
            // Limpando cronometro ( já que a pergunta foi respondida não tem razão para mandar o alerta ).
            clearTimeout(cronometro);
            // removendo 1° item  da lista de perguntas.
            perguntas.splice(0, 1);

            
            if (vencedores.length > 0) 
                sendEmbed(msg, 'CORRECT', 'Tempo Esgotado', 
                    [
                        { name: 'Vencedores', value: vencedores.map( (v, index) => index <= 2 ? `${medalhas[index]} <@${v.id}>` : `${index + 1}° <@${v.id}>`).join('\n'), inline: true },
                        { name: 'Pontuação', value: vencedores.map( v => v.pontos ).join('\n'), inline: true }
                    ]);
            else
                sendEmbed(msg, 'ERROR', 'Tempo Esgotado', [
                    { name: '\u200B', value: '**Ninguém acertou a pergunta**' }]);
            
            
            sendEmbed(msg, 'LOAD', 'Processando Informações', [
                { name: '\u200B', value: vencedores.length > 0 
                ? 'Parabéns à todos que acertaram! Vocês podem buscar esclarecimentos no tópico x do livro.' 
                : 'Droga! Parece que vocês não conseguiram quebrar essa barreira...\n' + 
                'Mas não se desanimem! \n\n🌐 **Eu fiz uma análise rápida da pergunta...** 🌐\n\n 📄 Os dados indicam que essa era uma pergunta do tipo **x**! 📄 \n\nTenho certeza que vocês poderão responder corretamente se melhorarem seus conhecimentos.' },
                { name: '\u200B', value: !perguntas[0] || collected.size === 0 ? 'Gerando arquivos finais...' : 'Retomando processo de quebra de barreiras... Carregando próxima pergunta.' }
            ]);

            // Espera X segundos até carregar outra pergunta
            setTimeout(function() {
                // Se não tiver próxima pergunta então quizz foi finalizado.
                // Ou se ninguém responder nenhuma alternativa.
                if (!perguntas[0] || collected.size === 0) {
                    collected.size === 0
                    ? sendEmbed(msg, 'ERROR', 'Quizz Finalizado', [
                        { name:'\u200B', value: '⏲️ **Inatividade** ⏲️'}])
                    : sendEmbed(msg, 'CORRECT', 'Quizz Finalizado', [
                        { name:'\u200B', value: '✅ Todas as Perguntas foram resolvidas. ✅'}]);
    
                    bot.quizz[msg.channel.id] = false; // Setando quizz como false possibilitando o início de outro quizz.
                }
                else
                    handleQuizz(msg, bot, perguntas, num_perguntas, alternativas, ++pContador);
            }, 5000);
        });
    });
}

module.exports = { obterPerguntas, handlePergunta, handleQuizz };