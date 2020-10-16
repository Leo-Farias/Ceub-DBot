const perguntas = require('../assets/perguntas.json');
const livro = require('../assets/livro.json');
const { MessageAttachment } = require('discord.js');
const { shuffle } = require('../utils/array-handler.js');
const { sendEmbed } = require('../utils/default-embeder');
const { genLetterAsEmoji } = require('../utils/emoji-letters.js');


const obterInfoQuizz = (msg, bot, args, TopicoController, DificuldadeController, level) => {
    let topico_list = [];
    let invalido_at = null;
    if (args[1]) {
        // RETIRANDO TÓPICOS DO COMANDO, ARGS[0] É O INÍCIO DO COMANDO POR ISSO É FILTRADO.
        topico_list = args.filter( (_, index) => index !== 0);
        // OBTENDO POSIÇÃO DE POSSÍVEL TÓPICO INVÁLIDO
        invalido_at = TopicoController.obterTopicoInvalidoFromArray(livro, topico_list);

        if (invalido_at !== null) {
            sendEmbed(msg, 'ERROR', 'Tópico Inválido', [
                { name:'\u200B', value: `Opa, parece que você se enganou agente, o tópico "${topico_list[invalido_at]}" não existe nos arquivos. \n\n** :gear:  Se quiser uma lista completa dos tópcios utilize o comando: :gear:\n\`!livro\`**`}]);      
            return [ null, null ];
        }
    }
    const ALTERNATIVAS = [ genLetterAsEmoji('a'), genLetterAsEmoji('b'), genLetterAsEmoji('c'), genLetterAsEmoji('d')];
    const dificuldades = DificuldadeController.obterDificuldadePorNivel(level);
    let perguntas = obterPerguntas(!invalido_at ? topico_list : null, dificuldades);
    
    if (!perguntas) {
        sendEmbed(msg, 'ERROR', 'Nenhuma Pergunta Encontrada', [
            { name:'\u200B', value: `Opa, parece que não conseguimos encontrar perguntas para você.`}]);
        return [ null, null ];      
    }
    bot.quizz[msg.channel.id] = true; // Setando quest como true.

    return [ALTERNATIVAS, perguntas];
}

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

const handleQuizz = (msg, bot, perguntas, num_perguntas, alternativas, pContador, quizzData = []) => {

    const medalhas = ['🥇', '🥈', '🥉'];
    const { tempo: tempo_pergunta, pontos: ponto_total, topico } = perguntas[0];
    let [embed, alt_correta, pergunta_icon] = handlePergunta(perguntas[0], pContador+1, num_perguntas, tempo_pergunta);
    let participantes = [];
    let vencedores = [];

    msg.channel.send({ files: [pergunta_icon], embed }).then( message => {
        alternativas.forEach(alt => message.react(alt)); // Reagindo as alternativas (a, b, c, d).

        const filter = (reaction, user) => // Filtro da coleta.
            alternativas.includes(reaction.emoji.name) && !user.bot && !participantes.includes(user.id); 

        const msgReaction = message.createReactionCollector(filter, { time: tempo_pergunta }); // Se quiser mudar o tempo alterar time

        let cronometro = setTimeout(() => { // Criar cronômetro para executar metade do tempo antes da pergunta finalizar.
            sendEmbed(msg, 'TIME', 'Tempo Acabando', [{name: '\u200B',value: `**Faltam ${Math.round((tempo_pergunta/1000)/2)} segundos.**`}])
        }, tempo_pergunta/2);

        msgReaction.on('collect', (r, { id: idParticipante }) => {

            participantes.push(idParticipante); // Adicionando participante na lista para filtrar
            let pontos = 0;

            if(r.emoji.name === alternativas[alt_correta]) {    
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
            // INSERINDO INFORMAÇÕES NO QUIZZDATA
            let idIndex = quizzData.findIndex(d => d.id === idParticipante);
            if (idIndex < 0) quizzData.push({ id: idParticipante, pontos });
            else quizzData[idIndex].pontos += pontos;
            
        });

        msgReaction.on('end', collected => {
            // Limpando cronometro ( já que a pergunta foi respondida não tem razão para mandar o alerta ).
            clearTimeout(cronometro);
            // removendo 1° item  da lista de perguntas.
            perguntas.splice(0, 1);

            
            if (vencedores.length > 0) 
                sendEmbed(msg, 'CORRECT', 'Resultado Pergunta:', 
                    [
                        { name: 'Vencedores', value: vencedores.map( (v, index) => index <= 2 ? `${medalhas[index]} <@${v.id}>` : `${index + 1}° <@${v.id}>`).join('\n'), inline: true },
                        { name: 'Pontuação', value: vencedores.map( v => v.pontos ).join('\n'), inline: true }
                    ]);
            else
                sendEmbed(msg, 'ERROR', 'Resultado Pergunta:', [
                    { name: '\u200B', value: '**Ninguém acertou a pergunta**' }]);
            
            if (quizzData.length > 0 )
                setTimeout( () => {
                    quizzData.sort((dAtual, dProximo) => dProximo.pontos - dAtual.pontos); // ORDENANDO EM ORDEM CRESCENTE
                    sendEmbed(msg, 'QUIZZ', 'Placar Quizz:', [
                        { name: 'Vencedores', value: quizzData.map( (v, index) => index <= 2 ? `${medalhas[index]} <@${v.id}>` : `${index + 1}° <@${v.id}>`).join('\n'), inline: true },
                        { name: 'Pontuação', value: quizzData.map( v => v.pontos ).join('\n'), inline: true }
                    ]);
                }, 3000);        

            setTimeout( () => {
                sendEmbed(msg, 'LOAD', 'Processando Informações: ', [
                    { name: '\u200B', value: `**ALTERNATIVA CORRETA**: ${alternativas[alt_correta]}`},
                    { name: '\u200B', value: vencedores.length > 0 
                    ? `Parabéns à todos que acertaram! Vocês podem buscar esclarecimentos no tópico **${topico}** do livro.` 
                    : 'Droga! Parece que nenhum de vocês conseguiu quebrar essa barreira...\n' + 
                    `Mas não se desanimem! 📄 Parece que essa era uma pergunta do tipo **${topico}**! 📄 \n\nTenho certeza que vocês responder corretamente se melhorarem seus conhecimentos.` },
                    { name: '\u200B', value: !perguntas[0] || collected.size === 0 ? 'Gerando arquivos finais... **Obtendo vencedor(a)**' : 'Retomando processo de quebra de barreiras... **Carregando próxima pergunta**...' }
                ]);
            }, 7000);

            // Espera X segundos até carregar outra pergunta
            setTimeout(function() {
                // Se não tiver próxima pergunta então quizz foi finalizado.
                // Ou se ninguém responder nenhuma alternativa.
                if (!perguntas[0] || collected.size === 0) {
                    let resultadoQuizzEmbed = [];
                    if (quizzData.length === 0) resultadoQuizzEmbed = { name: 'Vencedor(a): ', value: 'Como nenhum participante repondeu ao quizz, **não foi possível definir o(a) vencedor(a)**' };
                    else if (quizzData[0].pontos === 0 ) resultadoQuizzEmbed = { name: 'Vencedor(a): ', value: 'Como nenhum dos participantes acertou pelo menos uma pergunta, **não foi possível deifinir o(a) vencedor(a)**.' };
                    else {
                        let numVencedores = quizzData.reduce(
                            (accumulator, currentValue) =>  {
                                let addValue = currentValue.pontos === quizzData[0].pontos ? 1 : 0;
                                return accumulator + addValue
                        }, 0);
                        if (numVencedores > 1) resultadoQuizzEmbed = { name: 'Vencedores: ', value: quizzData.filter( d => d.pontos === quizzData[0].pontos ).forEach(v => `<@${v.id}>`).join('\n') };
                        else resultadoQuizzEmbed = { name: '\u200B', value: `**Vencedor(a): <@${quizzData[0].id}>` };
                    }
                    if (collected.size === 0) {
                        sendEmbed(msg, 'WINNER', 'Quizz Finalizado', [
                            { name:'\u200B', value: '**Motivo**: ⏲️ **Inatividade** ⏲️'}, resultadoQuizzEmbed]);
                    }
                    else {
                        sendEmbed(msg, 'WINNER', 'Quizz Finalizado', [
                            { name:'\u200B', value: '**Motivo**: ✅ Todas as Perguntas foram resolvidas. ✅'}, resultadoQuizzEmbed]);
                    }
    
                    bot.quizz[msg.channel.id] = false; // Setando quizz como false possibilitando o início de outro quizz.
                }
                else
                    handleQuizz(msg, bot, perguntas, num_perguntas, alternativas, ++pContador, quizzData);
            }, 12000);
        });
    });
}

module.exports = { obterPerguntas, handlePergunta, handleQuizz, obterInfoQuizz };