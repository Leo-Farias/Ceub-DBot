require('dotenv').config()
const fs = require('fs')
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
const ENV = process.env.ENV

// Obtendo demais recursos do projeto.
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const { sendEmbed } = require('./src/utils/default-embeder');
const QuizzController = require('./src/controllers/quizz.controller.js');
const LivroController = require('./src/controllers/livro.controller.js');
const livro = require('./src/assets/livro.json');
bot.quizz = {};

//const joinEvent = require('./src/events/join.event') 
bot.on('ready', () => {
    console.log("=== BOT INICIADO ===");
    console.log("ENV:" ,ENV, "\nPREFIX:", PREFIX, "\n\n\n")
})


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.
    if ((!msg.author.bot) && (/windows|Windows|WINDOWS/.test(msg.content))) msg.channel.send(`Linux > Windows`)

    // Filtra mensagens de bot
    if (msg.author.bot) return
    // Filtra mensagem apenas para aqueles que começam com o prefixo correto
    if (msg.content.substring(0, PREFIX.length) !== PREFIX) return
    
    // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
    let args = msg.content.substring(PREFIX.length).split(" ");    
    try{
        bot.commands.get(args[0]).execute(msg);
    } catch(err) {
        switch(args[0].toLowerCase()) {
            case 'help' || 'ajuda' || 'sos':
                helpMessageList = '-=-=-= Menu =-=-=-\n'
                bot.commands.forEach((command) => {
                    helpMessageList += `${command.name}: ${command.description}\n`
                })
                msg.channel.send(helpMessageList) 
                break;
            case 'livro': LivroController.sendLivro(msg, livro);
                break;
            case 'ler':
                if (!args[1]) {
                    sendEmbed(msg, 'ERROR', 'Campo Faltando', [
                        { name:'\u200B', value: '**Você precisa informar o campo de leitura.\n`!ler {topico}`**'}]);
                    break;
                }
                // OBTENDO TOPICOS VALIDOS PADRÃO.
                let topicosValidos = [];
                for (let topico in livro)
                    topicosValidos.push(topico);
    
                // PODEMOS FAZER O REPLACE PARA ACEITAR VALORES ALÉM DAS CHAVES DO OBJETO LIVRO
                let topico = args[1].toLowerCase().replace(/variavel|variável+/g, 'var')
                    .replace(/funcao|funçao|função+/g, 'func')
                    .replace(/objeto+/g, 'obj');
    
                if (!topicosValidos.includes(topico)) 
                    sendEmbed(msg, 'ERROR', 'Campo Faltando', [
                        { name:'\u200B', value: '**Não foi possível encontrar esse tópico.\nUtilize o comando `!livro` para ver a lista de tópicos**'}]);
    
                else {
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
            default:
                console.log("NO OPTION FOR: '" + msg.content + "'")
                break;
        }
    }
    
    
});

bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    console.log("Importing file:", file)
    const command = require(`./src/commands/${file}`)
    bot.commands.set(command.name, command)
}




// Inicializando o bot.
bot.login(token);