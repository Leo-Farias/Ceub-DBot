require('dotenv').config()
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
const ENV = process.env.ENV
console.log("\n\n\n\n\n\n\nENV:" ,ENV, "\nPREFIX:", PREFIX)

// Obtendo demais recursos do projeto.
const cm = require('./src/js/comandos.js');
const CommandController = require('./src/controllers/command.controller.js')
bot.quizz = {};

// Obtendo demais recursos do projeto.
const cm = require('./src/js/comandos.js');
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const { sendEmbed } = require('./src/utils/default-embeder');
const PongController = require('./src/controllers/pong.controller.js');
const QuizzController = require('./src/controllers/quizz.controller.js');
const LivroController = require('./src/controllers/livro.controller.js');
const livro = require('./src/assets/livro.json');

bot.on('ready', () => {
	console.log("=== BOT INICIADO ===");
});


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.

    if (/windows|Windows|WINDOWS/.test(msg.content) && !msg.author.bot) msg.channel.send(`Linux > Windows`);

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
                PongController.ping(msg);

                break;
            case 'livro':
                LivroController.sendLivro(msg, livro);

                break;
            case 'ler':
                const topicosValidos = [
                    'var', 'variavel', 'variável',
                    'func', 'funcao', 'funçao', 'função',
                    'obj', 'objeto'
                ];

                if (!args[1]) 
                    sendEmbed(msg, 'ERROR', 'Campo Faltando', [
                        { name:'\u200B', value: '**Você precisa informar o campo de leitura.\n`!ler {topico}`**'}]);

                else if (!topicosValidos.includes(args[1])) 
                    sendEmbed(msg, 'ERROR', 'Campo Faltando', [
                        { name:'\u200B', value: '**Não foi possível encontrar esse tópico.\nUtilize o comando `!livro` para ver a lista de tópicos**'}]);

                else {
                    let topico = args[1].replace(/variavel|variável+/g, 'var')
                    .replace(/funcao|funçao|função+/g, 'func')
                    .replace(/objeto+/g, 'obj');

                    let paginaIndex = 1; // ESSE VALOR VIRIA DO BANCO DIZENDO QUAL FOI A ÚLTIMA PÁGINA ACESSADA.
                    let paginas = livro[topico].pages;
                    LivroController.sendPagina(msg, paginas, paginaIndex);
                }
                
                break;
            case 'quizz':
                if (!bot.quizz[msg.channel.id]) {
                    bot.quizz[msg.channel.id] = true; // Setando quest como true.

                    let perguntas = QuizzController.obterPerguntas();
                    const ALTERNATIVAS = [ genLetterAsEmoji('a'), genLetterAsEmoji('b'), genLetterAsEmoji('c'), genLetterAsEmoji('d')];
                    let pContador = 0;

                    QuizzController.handleQuizz(msg, bot, perguntas, perguntas.length, ALTERNATIVAS, pContador);
                }
                else 
                    msg.channel.send(`Já existe um quizz ocorrendo neste momento.`);
                break;
                case 'run': CommandController.runCommand(msg)
        }
    }
});

// Inicializando o bot.
bot.login(token);