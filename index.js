require('dotenv').config()
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX

// Obtendo demais recursos do projeto.
const cm = require('./src/js/comandos.js');
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const PongController = require('./src/controllers/pong.controller.js');
const quizzController = require('./src/controllers/quizz.controller.js');

bot.on('ready', () => {
	console.log("=== BOT INICIADO ===");
});


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.

    // Filtra mensagem apenas para aqueles que começam com o prefixo e o autor não é outra conta de bot.
	if (msg.content.substring(0, PREFIX.length) === PREFIX && !msg.author.bot) {

        // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
        let args = msg.content.substring(PREFIX.length).split(" ");
        
		switch(args[0].toLowerCase()) {
			// COMANDOS PARA EXECUTAR:
			case 'ping': // Nome do comando;
                // Para interagir com o usuário utilizamos o objeto msg, que é gerado pelo evento. Este objeto 
                // Permite que a gente mande mensagens, pegue as informações do autor da mensagem, mandar uma mensagem
                // no canal em que o autor enviou o comando, entre outros.
                PongController.ping(msg)

                break;
            case 'somar': // EXEMPLO DE UM COMANDO COM VÁRIOS ARGUMENTOS
                // Eu geralmente chamo as resposta dos comandos de r(sigla_Do_Comando). rs => resposta somar.
                let rs = cm.somar(args[1], args[2]); // OBS: Args[n] são do tipo string. Então é sempre bom validar eles nos comandos.
                
                if(!rs.erro) {
                    msg.channel.send(`Resultado: ${ rs.resultado }`);
                    msg.channel.send(`Dobro do seu resultado: ${ 2 * rs.resultado }`);
                } 
                else 
                    msg.channel.send(rs.erro);
                
                break;
            case 'quizz': 
                let perguntas = quizzController.obterPerguntas();
                const ALTERNATIVAS = [ genLetterAsEmoji('a'), genLetterAsEmoji('b'), genLetterAsEmoji('c'), genLetterAsEmoji('d')];
                let pContador = 0;

                quizzController.handleQuizz(msg, perguntas, ALTERNATIVAS, pContador);
                // let [embed, alt_correta] = quizzController.handlePergunta(perguntas.splice(0, 1)[0], pContador+1);
                // msg.channel.send({ embed }).then( message => {
                //     alternativas.forEach(alt => message.react(alt));

                //     const filter = (reaction, user) => 
                //     alternativas.includes(reaction.emoji.name) && user.id === msg.author.id;

                //     const msgReaction = message.createReactionCollector(filter, { time: 10000 });

                //     msgReaction.on('collect', r => {
                //         if(r.emoji.name === alternativas[alt_correta]) {
                //             msg.channel.send('Você conseguiu!');
                //             msgReaction.stop();
                //         }
                //         else{
                //             msg.channel.send('Tente novamente!');
                //         } 
                //     })
                //     msgReaction.on('end', collected => {
                        
                //         message.channel.send('Tempo esgotado.');
                //     });
                // });

                // perguntas.forEach((pergunta, index) => {
                //     let [embed, alt_correta] = quizzController.handlePergunta(pergunta, index+1);

                //     msg.channel.send({ embed }).then( message => {
                //         alternativas.forEach(alt => message.react(alt));

                //         const filter = (reaction, user) => 
                //         alternativas.includes(reaction.emoji.name) && user.id === msg.author.id;

                //         const msgReaction = message.createReactionCollector(filter, { time: 15000 });

                //         msgReaction.on('collect', r => {
                //             console.log(r === alternativas[alt_correta]);
                //             r === alternativas[alt_correta] 
                //             ? msg.channel.send('Você conseguiu!')
                //             : msg.channel.send('Tente novamente!');
                //         })
                //     });
                // });
                
                break;
        }
    }
});

// Inicializando o bot.
bot.login(token);