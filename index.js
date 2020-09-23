require('dotenv').config()
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
bot.quizz = {};

// Obtendo demais recursos do projeto.
const cm = require('./src/js/comandos.js');
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const PongController = require('./src/controllers/pong.controller.js');
const QuizzController = require('./src/controllers/quizz.controller.js');

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
            case 'quizz':
                if (!bot.quizz[msg.guild.id]) {
                    bot.quizz[msg.guild.id] = true; // Setando quest como true.

                    let perguntas = QuizzController.obterPerguntas();
                    const ALTERNATIVAS = [ genLetterAsEmoji('a'), genLetterAsEmoji('b'), genLetterAsEmoji('c'), genLetterAsEmoji('d')];
                    let pContador = 0;

                    QuizzController.handleQuizz(msg, bot, perguntas, perguntas.length, ALTERNATIVAS, pContador);
                }
                else 
                    msg.channel.send(`Já existe um quizz ocorrendo neste momento.`);
                
                
                break;
        }
    }
});

// Inicializando o bot.
bot.login(token);